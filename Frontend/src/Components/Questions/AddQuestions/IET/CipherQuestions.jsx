import { useState, useEffect } from "react";
import QuizSettings from "./QuizSettings"; // Import the new component

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/questions/iet/cipher/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    setError(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get the current quiz settings
      const settingsResponse = await fetch('http://localhost:8080/questions/iet/cipher/settings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!settingsResponse.ok) {
        throw new Error("Failed to fetch quiz settings");
      }
      
      const quizSettings = await settingsResponse.json();
      
      // Combine question data with quiz settings
      const dataToSubmit = {
        ...questionData,
        quizTimeLimitSeconds: quizSettings.quizTimeLimitSeconds,
        quizStartTime: quizSettings.quizStartTime,
        quizEndTime: quizSettings.quizEndTime
      };
      
      console.log("Submitting question:", dataToSubmit);
      
      const response = await fetch("http://localhost:8080/questions/iet/cipher/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSuccess("Question added successfully!");
        setTimeout(() => setSuccess(null), 3000);
        
        setQuestionData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctAnswer: "",
        });
        
        fetchQuestions();
      } else {
        setError(Array.isArray(responseData.details) 
          ? responseData.details.join(', ') 
          : responseData.message || "Failed to add question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      setError("An error occurred while adding the question");
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await fetch(`http://localhost:8080/questions/iet/cipher/delete/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.ok) {
          setSuccess("Question deleted successfully!");
          setTimeout(() => setSuccess(null), 3000);
          setQuestions(questions.filter((q) => q._id !== id));
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to delete question!");
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        setError("An error occurred while deleting the question");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Quiz Settings Component */}
      <QuizSettings />

      {/* Question Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Add a New Question
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Question:</label>
            <input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {["option1", "option2", "option3", "option4"].map((option, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-medium">
                Option {index + 1}:
              </label>
              <input
                type="text"
                name={option}
                value={questionData[option]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium">
              Correct Answer:
            </label>
            <select
              name="correctAnswer"
              value={questionData.correctAnswer}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select the correct answer</option>
              <option value={questionData.option1}>{questionData.option1}</option>
              <option value={questionData.option2}>{questionData.option2}</option>
              <option value={questionData.option3}>{questionData.option3}</option>
              <option value={questionData.option4}>{questionData.option4}</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Question
          </button>
        </form>
      </div>
      
      {/* Display Questions */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Questions List
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
          ) : (
            <ul className="divide-y divide-gray-300">
            {questions.length === 0 ? (
            <p className="text-center text-gray-500">No questions found.</p>
            ) : (
            questions.map((question) => (
            <li key={question._id} className="flex justify-between items-center p-4">
            <span>{question.question}</span>
            <button
            onClick={() => handleDelete(question._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
            >
            Delete
            </button>
            </li>
            ))
            )}
            </ul>
            )}
            </div>
            </div>
            );
            };
            export default AdminQuestions;