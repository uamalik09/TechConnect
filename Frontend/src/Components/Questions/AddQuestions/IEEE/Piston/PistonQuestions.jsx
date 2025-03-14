import { useState, useEffect } from "react";
import QuizSettings from "./QuizSettings"; 
const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [questionData, setQuestionData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    marks: 1, 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editMarks, setEditMarks] = useState({ id: null, value: 1 });
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/questions/ieee/piston/get', {
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
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setTotalMarks(data.totalMarks || 0);
      } else if (Array.isArray(data)) {
        setQuestions(data);
        const total = data.reduce((sum, q) => sum + (q.marks || 1), 0);
        setTotalMarks(total);
      }
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
      const settingsResponse = await fetch('http://localhost:8080/questions/ieee/piston/settings', {
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
      const dataToSubmit = {
        ...questionData,
        marks: parseInt(questionData.marks) || 1, 
        quizTimeLimitSeconds: quizSettings.quizTimeLimitSeconds,
        quizStartTime: quizSettings.quizStartTime,
        quizEndTime: quizSettings.quizEndTime
      };
      
      console.log("Submitting question:", dataToSubmit);
      
      const response = await fetch("http://localhost:8080/questions/ieee/piston/add", {
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
          marks: 1,
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
        const response = await fetch(`http://localhost:8080/questions/ieee/piston/delete/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.ok) {
          setSuccess("Question deleted successfully!");
          setTimeout(() => setSuccess(null), 3000);
          setQuestions(questions.filter((q) => q._id !== id));
          const remainingQuestions = questions.filter((q) => q._id !== id);
          const newTotal = remainingQuestions.reduce((sum, q) => sum + (q.marks || 1), 0);
          setTotalMarks(newTotal);
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

  const startEditMarks = (question) => {
    setEditMarks({
      id: question._id,
      value: question.marks || 1
    });
  };

  const handleMarksChange = (e) => {
    setEditMarks({
      ...editMarks,
      value: parseInt(e.target.value) || 1
    });
  };

  const updateMarks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/questions/ieee/piston/updateMarks/${editMarks.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ marks: editMarks.value })
      });

      if (response.ok) {
        setSuccess("Marks updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
        const updatedQuestions = questions.map(q => 
          q._id === editMarks.id ? { ...q, marks: editMarks.value } : q
        );
        setQuestions(updatedQuestions);
        const newTotal = updatedQuestions.reduce((sum, q) => sum + (q.marks || 1), 0);
        setTotalMarks(newTotal);
        setEditMarks({ id: null, value: 1 });
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update marks!");
      }
    } catch (error) {
      console.error("Error updating marks:", error);
      setError("An error occurred while updating marks");
    }
  };
  const toggleQuestionExpansion = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <QuizSettings totalMarks={totalMarks} totalQuestions={questions.length} />
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

          <div>
            <label className="block text-gray-700 font-medium">
              Marks:
            </label>
            <input
              type="number"
              name="marks"
              value={questionData.marks}
              onChange={handleChange}
              min="1"
              max="100"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
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
      
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Questions List (Total: {questions.length}, Total Marks: {totalMarks})
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
                <li key={question._id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <span className="font-medium">{question.question}</span>
                      <button 
                        onClick={() => toggleQuestionExpansion(question._id)}
                        className="text-blue-600 text-sm hover:text-blue-800 mt-1 transition text-left"
                      >
                        {expandedQuestion === question._id ? "Hide options" : "Show options"}
                      </button>
                      
                      {expandedQuestion === question._id && (
                        <div className="mt-2 ml-2 bg-gray-50 p-3 rounded-md">
                          <p className="text-sm font-medium mb-1">Options:</p>
                          <ul className="list-disc list-inside text-sm">
                            <li className={question.correctAnswer === question.option1 ? "text-green-600 font-medium" : ""}>
                              {question.option1} {question.correctAnswer === question.option1 && "✓"}
                            </li>
                            <li className={question.correctAnswer === question.option2 ? "text-green-600 font-medium" : ""}>
                              {question.option2} {question.correctAnswer === question.option2 && "✓"}
                            </li>
                            <li className={question.correctAnswer === question.option3 ? "text-green-600 font-medium" : ""}>
                              {question.option3} {question.correctAnswer === question.option3 && "✓"}
                            </li>
                            <li className={question.correctAnswer === question.option4 ? "text-green-600 font-medium" : ""}>
                              {question.option4} {question.correctAnswer === question.option4 && "✓"}
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600 mt-2">
                        <p>Correct answer: <span className="text-green-600 font-medium">{question.correctAnswer}</span></p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {editMarks.id === question._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={editMarks.value}
                            onChange={handleMarksChange}
                            min="1"
                            max="100"
                            className="w-16 border border-gray-300 rounded-md p-1 focus:border-blue-500"
                          />
                          <button
                            onClick={updateMarks}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition text-sm"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                            {question.marks || 1} mark{(question.marks || 1) !== 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => startEditMarks(question)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition text-sm"
                          >
                            Edit Marks
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(question._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
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