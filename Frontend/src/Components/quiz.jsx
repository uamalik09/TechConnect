import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const navigate = useNavigate();

    // Fetch questions from backend
    useEffect(() => {
        Axios.get("http://localhost:8080/questions/get-questions")
            .then((response) => {
                setQuestions(response.data);
                setAnswers(Array(response.data.length).fill(""));
            })
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

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

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

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
