import { useState, useEffect } from "react";
import QuizSettings from "./QuizSettings"; 
import { useNavigate,useParams } from "react-router-dom";
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
const AdminQuestions = () => {

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [userRole, setUserRole] = useState(null);
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
  const {sig}=useParams();
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const userData = getUserData();
  console.log("User Role:", userData.role);

  useEffect(() => {
    if (!userData.token) {
      console.error("No token found, redirecting to login.");
      navigate("/home");
      return;
    }
    if (userData.role) {
      setUserRole(userData.role);
      if (userData.role !== "ie") {
        console.error("Unauthorized role, redirecting.");
        navigate("/home");
    }
    }
  }, [userData.role, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/questions/ie/${sig}/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
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
      const settingsResponse = await fetch(`http://localhost:8080/questions/ie/${sig}/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
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
      
      const response = await fetch(`http://localhost:8080/questions/ie/${sig}/add`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`
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
        const response = await fetch(`http://localhost:8080/questions/ie/${sig}/delete/${id}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${userData.token}`
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
      const response = await fetch(`http://localhost:8080/questions/ie/${sig}/updateMarks/${editMarks.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-6">
      <QuizSettings totalMarks={totalMarks} totalQuestions={questions.length} />
      
      {/* Add Question Form */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-2xl mb-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-400 border-b border-gray-700 pb-3">
          Add a New Question
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium mb-1">Question:</label>
            <input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          {["option1", "option2", "option3", "option4"].map((option, index) => (
            <div key={index}>
              <label className="block text-gray-300 font-medium mb-1">
                Option {index + 1}:
              </label>
              <input
                type="text"
                name={option}
                value={questionData[option]}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Correct Answer:
            </label>
            <select
              name="correctAnswer"
              value={questionData.correctAnswer}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white"
            >
              <option value="">Select the correct answer</option>
              <option value={questionData.option1}>{questionData.option1}</option>
              <option value={questionData.option2}>{questionData.option2}</option>
              <option value={questionData.option3}>{questionData.option3}</option>
              <option value={questionData.option4}>{questionData.option4}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
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
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-900/50 border border-green-700 text-green-200 rounded">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition font-medium"
          >
            Add Question
          </button>
        </form>
      </div>
      
      {/* Questions List */}
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-3xl border border-gray-700">
        <h2 className="text-xl font-bold text-center mb-6 text-purple-400 border-b border-gray-700 pb-3">
          Questions List (Total: {questions.length}, Total Marks: {totalMarks})
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-700">
            {questions.length === 0 ? (
              <p className="text-center text-gray-400 py-6">No questions found.</p>
            ) : (
              questions.map((question) => (
                <li key={question._id} className="py-4 px-3 hover:bg-gray-750 rounded-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-200">{question.question}</span>
                      <button 
                        onClick={() => toggleQuestionExpansion(question._id)}
                        className="text-purple-400 text-sm hover:text-purple-300 mt-2 transition text-left flex items-center"
                      >
                        {expandedQuestion === question._id ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Hide options
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Show options
                          </>
                        )}
                      </button>
                      
                      {expandedQuestion === question._id && (
                        <div className="mt-2 ml-2 bg-gray-750 p-3 rounded-md border border-gray-700">
                          <p className="text-sm font-medium mb-2 text-gray-300">Options:</p>
                          <ul className="space-y-1 text-sm">
                            <li className={`flex items-center ${question.correctAnswer === question.option1 ? "text-green-400 font-medium" : "text-gray-300"}`}>
                              <span className="mr-2">{question.correctAnswer === question.option1 ? '✓' : '•'}</span>
                              {question.option1}
                            </li>
                            <li className={`flex items-center ${question.correctAnswer === question.option2 ? "text-green-400 font-medium" : "text-gray-300"}`}>
                              <span className="mr-2">{question.correctAnswer === question.option2 ? '✓' : '•'}</span>
                              {question.option2}
                            </li>
                            <li className={`flex items-center ${question.correctAnswer === question.option3 ? "text-green-400 font-medium" : "text-gray-300"}`}>
                              <span className="mr-2">{question.correctAnswer === question.option3 ? '✓' : '•'}</span>
                              {question.option3}
                            </li>
                            <li className={`flex items-center ${question.correctAnswer === question.option4 ? "text-green-400 font-medium" : "text-gray-300"}`}>
                            <span className="mr-2">{question.correctAnswer === question.option4 ? '✓' : '•'}</span>
                              {question.option4}
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-400 mt-2">
                        <p>Correct answer: <span className="text-green-400 font-medium">{question.correctAnswer}</span></p>
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
                            className="w-16 bg-gray-700 border border-gray-600 rounded-md p-1 focus:border-purple-500 focus:ring focus:ring-purple-500 text-white"
                          />
                          <button
                            onClick={updateMarks}
                            className="bg-purple-600 text-white px-2 py-1 rounded-md hover:bg-purple-700 transition text-sm"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-purple-900/40 text-purple-300 rounded-md text-sm border border-purple-700/50">
                            {question.marks || 1} mark{(question.marks || 1) !== 1 ? 's' : ''}
                          </span>
                          <button
                            onClick={() => startEditMarks(question)}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md hover:bg-gray-600 transition text-sm"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(question._id)}
                        className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800 transition flex items-center space-x-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
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
// import { useState, useEffect } from "react";
// import QuizSettings from "./QuizSettings";
// import { useNavigate } from "react-router-dom";

// const getUserData = () => {
//   try {
//     const userData = localStorage.getItem("user");
//     if (!userData) {
//       throw new Error("No user data found");
//     }

//     const parsedData = JSON.parse(userData);
//     if (!parsedData.token) {
//       throw new Error("No valid token found");
//     }

//     return parsedData;
//   } catch (error) {
//     console.error("Error retrieving user data:", error.message);
//     return null;
//   }
// };

// const AdminQuestions = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [totalMarks, setTotalMarks] = useState(0);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [expandedQuestion, setExpandedQuestion] = useState(null);
//   const userData = getUserData();

//   useEffect(() => {
//     if (!userData || !userData.token) {
//       console.error("No token found, redirecting to login.");
//       navigate("/login");
//       return;
//     }
//     if (userData.role) {
//       setUserRole(userData.role);
//       if (userData.role !== "ie") {
//         console.error("Unauthorized role, redirecting.");
//         navigate("/home");
//       }
//     }
//   }, [navigate, userData]);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:8080/questions/ie/${sig}/get", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${userData.token}` // Fixed token retrieval
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setQuestions(data);
//         setTotalMarks(data.reduce((sum, q) => sum + (q.marks || 1), 0));
//       } else if (data.questions && Array.isArray(data.questions)) {
//         setQuestions(data.questions);
//         setTotalMarks(data.totalMarks || 0);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       setError("Failed to load questions");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this question?")) {
//       try {
//         const response = await fetch(`http://localhost:8080/questions/ie/${sig}/delete/${id}`, {
//           method: "DELETE",
//           headers: {
//             "Authorization": `Bearer ${userData.token}` // Fixed token retrieval
//           }
//         });

//         if (response.ok) {
//           setSuccess("Question deleted successfully!");
//           setTimeout(() => setSuccess(null), 3000);
//           setQuestions((prev) => prev.filter((q) => q._id !== id));
//           setTotalMarks((prev) => prev - 1);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to delete question!");
//         }
//       } catch (error) {
//         console.error("Error deleting question:", error);
//         setError("An error occurred while deleting the question");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Questions Panel</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//       {questions.length > 0 ? (
//         <ul>
//           {questions.map((question) => (
//             <li key={question._id}>
//               <p>{question.question}</p>
//               <button onClick={() => handleDelete(question._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No questions available.</p>
//       )}
//     </div>
//   );
// };

// export default AdminQuestions;
