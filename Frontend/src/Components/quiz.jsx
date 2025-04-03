import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("No user data found");
      }
      
      const parsedData = JSON.parse(userData);
      if (!parsedData.token) {
        throw new Error("No valid token found");
      }
      
      return parsedData;
    } catch (error) {
      console.error("Error retrieving user data:", error.message);
      return null;
    }
  };
    

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);
    const [quizStatus, setQuizStatus] = useState("loading"); // loading, scheduled, active, ended, submitted, notRegistered
    const [quizSettings, setQuizSettings] = useState({
        quizTimeLimitSeconds: 600,
        quizStartTime: null,
        quizEndTime: null
    });
    const [totalMarks, setTotalMarks] = useState(0);
    const [scoredMarks, setScoredMarks] = useState(0);
    
    const { club, sig } = useParams(); 
    
    // User information state
    const [userInfo, setUserInfo] = useState({
        name: "",
        rollNumber: ""
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

    // const resetQuizState = () => {
    //     const uniqueQuizId = `${club}_${sig}`;
    //     const quizSubmittedKey = `quizSubmitted_${uniqueQuizId}`;
        
    //     // Clear all quiz-related storage
    //     localStorage.removeItem(quizSubmittedKey);
    //     sessionStorage.removeItem(`quizTime_${uniqueQuizId}`);
    //     sessionStorage.removeItem(`quizStartTime_${uniqueQuizId}`);
    //     sessionStorage.removeItem(`quizAnswers_${uniqueQuizId}`);
        
    //     // Reload the page to start fresh
    //     window.location.reload();
    // };

    const fetchQuizSettings = () => {
        const userData = getUserData(); 
        if (!userData||userData.role!="user") {
            navigate('/home');
            return;
        }
        // First, fetch quiz settings - this will tell us if the quiz exists and is available
        fetch(`https://tech--connect.azurewebsites.net/questions/${club}/${sig}/settings/student`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(settings => {
            setQuizSettings(settings);
            // Store the total time limit for later reference
            localStorage.setItem("quizTimeLimit", settings.quizTimeLimitSeconds);

            const now = new Date();
            const startTime = new Date(settings.quizStartTime);
            const endTime = new Date(settings.quizEndTime);
            
            // Use a unique quiz identifier that includes both club and sig
            const uniqueQuizId = `${club}_${sig}`;
            const quizSubmittedKey = `quizSubmitted_${uniqueQuizId}`;
            const quizSubmitted = localStorage.getItem(quizSubmittedKey);

            if (quizSubmitted === "true") {
                setQuizStatus("submitted");
                return;
            }

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
                const savedTime = sessionStorage.getItem(`quizTime_${uniqueQuizId}`);
                const savedStartTime = sessionStorage.getItem(`quizStartTime_${uniqueQuizId}`);
                
                if (savedTime && savedStartTime) {
                    // If we have saved progress, calculate remaining time
                    const elapsedSeconds = Math.floor((now - new Date(savedStartTime)) / 1000);
                    const remainingTime = Math.max(0, parseInt(savedTime) - elapsedSeconds);
                    setTimeLeft(remainingTime);
                } else {
                    // Start fresh timer
                    setTimeLeft(settings.quizTimeLimitSeconds);
                    sessionStorage.setItem(`quizTime_${uniqueQuizId}`, settings.quizTimeLimitSeconds);
                    sessionStorage.setItem(`quizStartTime_${uniqueQuizId}`, now.toISOString());
                }
                
                // Fetch questions since quiz is active
                fetchQuestions(uniqueQuizId);
            }
        })
        .catch(error => {
            console.error("Error fetching quiz settings:", error);
            setQuizStatus("error");
        });
    };

    // Fetch questions function
    const fetchQuestions = (uniqueQuizId) => {
        const userData = getUserData(); 
        if (!userData||userData.role!="user") {
            navigate('/home');
            return;
        }
        
        fetch(`https://tech--connect.azurewebsites.net/questions/${club}/${sig}/get/student`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); 
            let questionsList = [];
            let totalMarksCount = 0;
            
            if (data && typeof data === 'object' && data.questions) {
                questionsList = data.questions;
                totalMarksCount = data.totalMarks || questionsList.reduce((total, q) => total + (q.marks || 1), 0);
            } else if (Array.isArray(data)) {
                questionsList = data;
                totalMarksCount = questionsList.reduce((total, q) => total + (q.marks || 1), 0);
            } else {
                console.error("Unexpected data structure:", data);
                questionsList = [];
                totalMarksCount = 0;
            }
            
            setQuestions(questionsList);
            setTotalMarks(totalMarksCount);
            
            const savedAnswers = sessionStorage.getItem(`quizAnswers_${uniqueQuizId}`);
            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            } else {
                setAnswers(Array(questionsList.length).fill(""));
            }
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            setQuestions([]);
            setTotalMarks(0);
            alert("An unexpected error occurred. Please check your internet connection.");
        });
    };

    useEffect(() => {
        if (answers.length > 0 ) {
            const uniqueQuizId = `${club}_${sig}`;
            sessionStorage.setItem(`quizAnswers_${uniqueQuizId}`, JSON.stringify(answers));
        }
    }, [answers, club, sig]);

    useEffect(() => {
        if (quizStatus !== "active" || timeLeft === null) return;
        
        if (timeLeft <= 0) {
            submitQuiz(); 
            return;
        }
        
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                const uniqueQuizId = `${club}_${sig}`;
                sessionStorage.setItem(`quizTime_${uniqueQuizId}`, newTime); 
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft, quizStatus, club, sig]);
   
    const submitQuiz = async () => {
        const userData = getUserData(); 
        if (!userData||userData.role!="user") {
            navigate('/home');
            return;
        }
        const uniqueQuizId = `${club}_${sig}`;
        const quizSubmittedKey = `quizSubmitted_${uniqueQuizId}`;
        localStorage.setItem(quizSubmittedKey, 'true');
        sessionStorage.removeItem(`quizTime_${uniqueQuizId}`);
        sessionStorage.removeItem(`quizStartTime_${uniqueQuizId}`);
    
        const { name, rollNumber } = userInfo;
            
        if (!rollNumber || !name) {
            alert("User information not found. Please provide your details again.");
            return;
        }
        
        const formattedAnswers = answers.map((answer, index) => {
            return {
                questionId: questions[index]?._id || `question-${index}`,
                selectedOption: answer
            };
        });
        
        const payload = {
            rollNumber: rollNumber,
            studentName: name,
            quizModel: `${club}${sig}`, 
            answers: formattedAnswers, 
        };
    
        console.log('Payload being sent:', payload);
        try {
            const response = await fetch(`https://tech--connect.azurewebsites.net/results/${club}/${sig}/submit`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) 
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to submit quiz. Please try again.");
            }
            
            const data = await response.json();
            setScoredMarks(data.score || 0);
            navigate(`/${club}/${sig}/results`, {
                state: {
                    name: name,
                    rollNumber: rollNumber,
                    club: club,
                    sig: sig,
                    submitted: true,
                    answers: answers,
                    score: data.score,
                    totalQuestions: data.totalQuestions,
                    totalMarks: totalMarks,
                    scoredMarks: data.score || 0
                }
            });
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    const checkRegistration = () => {
        const rollNumber = userInfo.rollNumber;
        if (!rollNumber) return false;
        
        const storageKey = `student_registration_${rollNumber}`;
        const registrationData = JSON.parse(localStorage.getItem(storageKey));
        
        if (!registrationData || !registrationData.registrations) {
            return false;
        }
        const currentClub = club.toLowerCase();
        const currentSig = sig.toLowerCase();
        return registrationData.registrations.some(reg => 
            reg.clubName.toLowerCase() === currentClub && 
            reg.sigName.toLowerCase() === currentSig
        );
    };
    useEffect(() => {
        const registrations = JSON.parse(localStorage.getItem('student_registrations') || '[]');
        
        if (registrations.length > 0) {
            const latestRegistration = registrations[registrations.length - 1];
            
            if (latestRegistration && latestRegistration.studentData) {
                setUserInfo({
                    name: latestRegistration.studentData.name,
                    rollNumber: latestRegistration.studentData.rollNumber
                });
                localStorage.setItem('userInfo', JSON.stringify({
                    name: latestRegistration.studentData.name,
                    rollNumber: latestRegistration.studentData.rollNumber
                }));
                
                const currentClub = club.toLowerCase();
                const currentSig = sig.toLowerCase();
                
                const isRegistered = latestRegistration.registrations.some(reg => 
                    reg.clubName.toLowerCase() === currentClub && 
                    reg.sigName.toLowerCase() === currentSig
                );
                
                if (isRegistered) {
                    
                    fetchQuizSettings();
                } else {
                    
                    setQuizStatus("notRegistered");
                }
            } else {
                
                const savedUserInfo = localStorage.getItem('userInfo');
                if (savedUserInfo) {
                    setUserInfo(JSON.parse(savedUserInfo));
                    
                    if (checkRegistration()) {
                        fetchQuizSettings();
                    } else {
                        setQuizStatus("notRegistered");
                    }
                }
            }
        } else {
            
            const savedUserInfo = localStorage.getItem('userInfo');
            if (savedUserInfo) {
                setUserInfo(JSON.parse(savedUserInfo));
                
                if (checkRegistration()) {
                    fetchQuizSettings();
                } else {
                    setQuizStatus("notRegistered");
                }
            }
        }
    }, [club, sig]);

   
    if (!localStorage.getItem('userInfo') && quizStatus !== "notRegistered") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Registration Required</h1>
                    <p className="mb-6 text-center">Please register for clubs and SIGs first.</p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Go to Registration
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (quizStatus === "notRegistered") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-6">Not Registered</h1>
                    <p className="mb-4 text-center">
                        You are not registered for {club.toUpperCase()} - {sig.toUpperCase()}.
                    </p>
                    <p className="mb-6 text-center">
                        Please register for this club and SIG before attempting the quiz.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/registration')}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Go to Registration
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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

    if (quizStatus === "submitted") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-yellow-100 rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Quiz Already Submitted</h1>
                    <p className="mb-6">You have already submitted this quiz.</p>
                    <div className="flex flex-col space-y-3">
                       {/* <button
                            onClick={() => navigate(`/${club}/${sig}/results`)}
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            View Results
                        </button> */}    
                        {/* <button
                            onClick={resetQuizState}
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Reset Quiz (For Testing)
                        </button> */}
                    </div>
                </div>
            </div>
        );
    }

    if (quizStatus === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <div className="bg-red-100 rounded-lg p-8 max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p className="mb-4">There was a problem loading the quiz.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-lg"><strong>Name:</strong> {userInfo.name}</p>
                <p className="text-lg"><strong>Roll Number:</strong> {userInfo.rollNumber}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className={`px-4 py-2 rounded-lg ${timeLeft <= 60 ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"}`}>
                    ⏳ Time Left: {formatTime(timeLeft)}
                </span>
                <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Total Marks: {totalMarks}
                </span>
            </div>

            <h1 className="text-4xl font-bold text-center mb-6">{club.toUpperCase()} - {sig.toUpperCase()} Quiz</h1>
            <form>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={question._id || index} className="mb-6 bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-semibold">
                                    {index + 1}. {question.question}
                                </h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                                    {question.marks || 1} mark{(question.marks || 1) !== 1 ? 's' : ''}
                                </span>
                            </div>
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
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-600">No questions available for this quiz.</p>
                        <p className="text-md text-gray-500 mt-2">Please check back later or contact the administrator.</p>
                    </div>
                )}

                {Array.isArray(questions) && questions.length > 0 && (
                    <div className="mt-8 mb-4">
                        <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
                            <p className="text-lg font-medium">Total Questions: {questions.length}</p>
                            <p className="text-lg font-medium">Total Marks: {totalMarks}</p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={submitQuiz}
                                className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default QuizPage;