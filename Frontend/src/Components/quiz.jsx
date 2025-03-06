import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const navigate = useNavigate();

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Fetch questions from backend
    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
            console.error("No authentication token found");
            // Optionally redirect to login page
            navigate('/login');
            return;
        }

        // Fetch questions with authorization header
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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error response:", error.response.data);
                console.error("Error status:", error.response.status);
                
                // Handle specific error cases
                if (error.response.status === 401) {
                    // Unauthorized - token might be invalid
                    alert("Your session has expired. Please log in again.");
                    navigate('/login');
                } else if (error.response.status === 403) {
                    // Forbidden - user might not have permission
                    alert("You do not have permission to access this quiz.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                alert("Unable to connect to the server. Please check your internet connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up request:", error.message);
                alert("An unexpected error occurred.");
            }
        });
    }, [navigate]);

    // Load saved timer progress (prevents reset on refresh)
    useEffect(() => {
        const savedTime = sessionStorage.getItem("quizTime");
        if (savedTime) {
            setTimeLeft(Number(savedTime));
        }
    }, []);

    // Timer countdown logic
    useEffect(() => {
        if (timeLeft <= 0) {
            submitQuiz(); // Auto-submit when time runs out
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
            sessionStorage.setItem("quizTime", timeLeft - 1); // Save progress
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Submit the quiz manually or automatically
    const submitQuiz = () => {
        sessionStorage.removeItem("quizTime"); // Clear saved timer
        navigate("/results", { state: { submitted: true } });
    };

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