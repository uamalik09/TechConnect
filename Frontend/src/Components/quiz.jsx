import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [quizStatus, setQuizStatus] = useState("loading"); // loading, scheduled, active, ended
    const [quizSettings, setQuizSettings] = useState({
        quizTimeLimitSeconds: 600,
        quizStartTime: null,
        quizEndTime: null
    });
    const navigate = useNavigate();

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Format date as readable string
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get quiz settings and check availability
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // First, fetch quiz settings
        Axios.get("http://localhost:8080/questions/iet/cipher/settings", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const settings = response.data;
            setQuizSettings(settings);

            const now = new Date();
            const startTime = new Date(settings.quizStartTime);
            const endTime = new Date(settings.quizEndTime);

            // Check if quiz is available now
            if (now < startTime) {
                // Quiz not started yet
                setQuizStatus("scheduled");
            } else if (now > endTime) {
                // Quiz already ended
                setQuizStatus("ended");
            } else {
                // Quiz is active
                setQuizStatus("active");
                
                // Load timer from sessionStorage or set to quiz time limit
                const savedTime = sessionStorage.getItem("quizTime");
                const savedStartTime = sessionStorage.getItem("quizStartTime");
                
                if (savedTime && savedStartTime) {
                    // If we have saved progress, calculate remaining time
                    const elapsedSeconds = Math.floor((now - new Date(savedStartTime)) / 1000);
                    const remainingTime = Math.max(0, parseInt(savedTime) - elapsedSeconds);
                    setTimeLeft(remainingTime);
                } else {
                    // Start fresh timer
                    setTimeLeft(settings.quizTimeLimitSeconds);
                    sessionStorage.setItem("quizTime", settings.quizTimeLimitSeconds);
                    sessionStorage.setItem("quizStartTime", now.toISOString());
                }
                
                // Fetch questions since quiz is active
                fetchQuestions(token);
            }
        })
        .catch(error => {
            console.error("Error fetching quiz settings:", error);
            setQuizStatus("error");
        });
    }, [navigate]);

    // Fetch questions function
    const fetchQuestions = (token) => {
        Axios.get("http://localhost:8080/questions/iet/cipher/get", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setQuestions(response.data);
            setAnswers(Array(response.data.length).fill(""));
        })
        .catch((error) => {
            console.error("Error fetching questions:", error);
            
            // Handle different types of errors
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    navigate('/login');
                } else if (error.response.status === 403) {
                    alert("You do not have permission to access this quiz.");
                }
            } else if (error.request) {
                alert("Unable to connect to the server. Please check your internet connection.");
            } else {
                alert("An unexpected error occurred.");
            }
        });
    };

    // Timer countdown logic
    useEffect(() => {
        if (quizStatus !== "active" || timeLeft === null) return;
        
        if (timeLeft <= 0) {
            submitQuiz(); // Auto-submit when time runs out
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                sessionStorage.setItem("quizTime", newTime); // Save progress
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft, quizStatus]);

    // Submit the quiz manually or automatically
    const submitQuiz = () => {
        // Get the token
        const token = localStorage.getItem('token');
        
        // Mark as submitted locally (as backup)
        localStorage.setItem('quizSubmitted', 'true');
        
        // Clear session storage
        sessionStorage.removeItem("quizTime");
        sessionStorage.removeItem("quizStartTime");
        
        // Submit to backend
        Axios.post("http://localhost:8080/questions/iet/cipher/submit", {
            answers: answers
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Navigate to results page with score
            navigate("/results", { 
                state: { 
                    submitted: true,
                    answers: answers,
                    score: response.data.score,
                    totalQuestions: response.data.totalQuestions
                } 
            });
        })
        .catch(error => {
            console.error("Error submitting quiz:", error);
            
            // Check if user already submitted
            if (error.response && error.response.status === 400) {
                setQuizStatus("submitted");
                navigate("/results");
            } else {
                alert("Failed to submit quiz. Please try again.");
            }
        });
    };
    // Render different content based on quiz status
    if (quizStatus === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading quiz...</div>
            </div>
        );
    }
    
    if (quizStatus === "scheduled") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-blue-100 rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz Not Available Yet</h1>
                    <p className="mb-4">This quiz will be available from:</p>
                    <p className="font-semibold text-lg mb-2">
                        {formatDate(quizSettings.quizStartTime)}
                    </p>
                    <p className="mb-4">Until:</p>
                    <p className="font-semibold text-lg mb-6">
                        {formatDate(quizSettings.quizEndTime)}
                    </p>
                    <p>Please return during this time to take the quiz.</p>
                </div>
            </div>
        );
    }
    
    if (quizStatus === "ended") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-red-100 rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz Has Ended</h1>
                    <p className="mb-4">This quiz was available until:</p>
                    <p className="font-semibold text-lg mb-4">
                        {formatDate(quizSettings.quizEndTime)}
                    </p>
                    <p>The quiz is no longer available for participation.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Timer Display */}
            <div className="text-center text-lg font-semibold mb-4">
                <span className={`px-4 py-2 rounded-lg ${timeLeft <= 60 ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"}`}>
                    ⏳ Time Left: {formatTime(timeLeft)}
                </span>
            </div>

            <h1 className="text-4xl font-bold text-center mb-6">Quiz</h1>
            <form>
                {questions.map((question, index) => (
                    <div key={question._id || index} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">
                            {index + 1}. {question.question}
                        </h3>
                        {[question.option1, question.option2, question.option3, question.option4].map((option, optIndex) => (
                            <div key={optIndex} className="mb-2">
                                <label className="inline-flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => {
                                            const updatedAnswers = [...answers];
                                            updatedAnswers[index] = option;
                                            setAnswers(updatedAnswers);
                                        }}
                                        className="form-radio text-blue-500"
                                    />
                                    <span className="text-lg">{option}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={submitQuiz}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizPage;