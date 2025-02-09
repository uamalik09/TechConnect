import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
    const { state } = useLocation();
    const { questions, answers } = state;

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (question.correctOption === answers[index]) {
                score++;
            }
        });
        return score;
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Results</h1>
            <p>Your Score: {calculateScore()} / {questions.length}</p>
            <div>
                {questions.map((question, index) => (
                    <div key={question.id} style={{ marginBottom: "20px" }}>
                        <h3>{index + 1}. {question.question}</h3>
                        <p>Correct Answer: {question.correctOption}</p>
                        <p>Your Answer: {answers[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;
