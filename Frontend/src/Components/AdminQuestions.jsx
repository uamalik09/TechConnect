import { useState, useEffect } from "react";

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

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/questions/get-questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/questions/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });

    if (response.ok) {
      alert("Question added successfully!");
      setQuestionData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
      });
      fetchQuestions(); // Refresh questions after adding a new one
    } else {
      alert("Failed to add question!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await fetch(`http://localhost:8080/questions/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Question deleted successfully!");
          setQuestions(questions.filter((q) => q._id !== id)); // Update state after deletion
        } else {
          alert("Failed to delete question!");
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
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
              className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
                className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              className="w-full border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select the correct answer</option>
              <option value={questionData.option1}>{questionData.option1}</option>
              <option value={questionData.option2}>{questionData.option2}</option>
              <option value={questionData.option3}>{questionData.option3}</option>
              <option value={questionData.option4}>{questionData.option4}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Question
          </button>
        </form>
      </div>

      {/* Display Questions */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
          Questions List
        </h2>
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
      </div>
    </div>
  );
};

export default AdminQuestions;
