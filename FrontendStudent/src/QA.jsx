import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:5100/get-question").then((response) => {
            setQuestions(response.data);
            setAnswers(Array(response.data.length).fill(""));
        });
    }, []);

    const submitQuiz = () => {
        navigate("/results", { state: { questions, answers } });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Quiz</h1>
            <form>
                {questions.map((question, index) => (
                    <div key={question.id} style={{ marginBottom: "20px" }}>
                        <h3>{index + 1}. {question.question}</h3>
                        {[question.option1, question.option2, question.option3, question.option4].map((option, optIndex) => (
                            <div key={optIndex}>
                                <label>
                                    <input
                                        type="radio"
                                        name={'question-${index}'}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => {
                                            const updatedAnswers = [...answers];
                                            updatedAnswers[index] = option;
                                            setAnswers(updatedAnswers);
                                        }}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="button" onClick={submitQuiz}>Submit</button>
            </form>
        </div>
    );
};

export default QuizPage;