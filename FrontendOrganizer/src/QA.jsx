import React, { useState, useEffect } from "react";
import Axios from "axios";
import './QA.css'
const AdminPage = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctOption, setCorrectOption] = useState("");
    const [questions, setQuestions] = useState([]);  // New state to hold all questions

    // Fetch existing questions when the component mounts
    useEffect(() => {
        Axios.get("http://localhost:5100/get-question")
            .then((response) => {
                setQuestions(response.data);  // Set fetched questions in the state
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
            });
    }, []); // Empty dependency array to ensure this runs only once when the component mounts

    // Function to add a new question
    const addQuestion = () => {
        console.log({
            question,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
            correctOption
        });

        Axios.post("http://localhost:5100/add-question", {
            question,
            option1: options[0],
            option2: options[1],
            option3: options[2],
            option4: options[3],
            correctOption
        }).then((response) => {
            console.log("Question added:", response.data);
            alert("Question added successfully!");

            // Clear the input fields after successful submission
            setQuestion("");
            setOptions(["", "", "", ""]);
            setCorrectOption("");

            // Fetch the updated list of questions after adding a new one
            Axios.get("http://localhost:5100/get-question")
                .then((response) => {
                    setQuestions(response.data); // Update questions state with new data
                })
                .catch((error) => {
                    console.error("Error fetching questions:", error);
                });
        }).catch((error) => {
            console.error("Error adding question:", error.response || error);
            alert("Error adding question: " + (error.response?.data?.error || error.message));
        });
    };
    const deleteQuestion = (id) => {
        console.log("Attempting to delete question with ID:", id); // Debugging log
      
        Axios.delete(`http://localhost:5100/add-question/${id}`)
          .then((response) => {
            console.log("Question deleted:", response.data);
            alert("Question deleted successfully!");
      
            // Remove the deleted question from the state to update the UI
            setQuestions(questions.filter(q => q.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting question:", error.response || error);
            alert("Error deleting question: " + (error.response?.data?.error || error.message));
          });
      };
      
    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Page</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <div>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => {
                                    const updatedOptions = [...options];
                                    updatedOptions[index] = e.target.value;
                                    setOptions(updatedOptions);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter Correct Answer"
                    value={correctOption}
                    onChange={(e) => setCorrectOption(e.target.value)}
                />
                <button onClick={addQuestion}>Add Question</button>
            </div>

            {/* Display added questions */}
            <div>
                <h2>Existing Questions</h2>
                <ul>
                    {questions.length > 0 ? (
                        questions.map((q, index) => (
                            <li key={index}>
                                <strong>{q.question}</strong>
                                <br />
                                Options:
                                <ul>
                                    <li>{q.option1}</li>
                                    <li>{q.option2}</li>
                                    <li>{q.option3}</li>
                                    <li>{q.option4}</li>
                                </ul>
                                Correct Option: {q.correctOption}
                                <button onClick={() => deleteQuestion(q.id)}>Delete</button>
                            </li>
                        ))
                    ) : (
                        <p>No questions added yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
