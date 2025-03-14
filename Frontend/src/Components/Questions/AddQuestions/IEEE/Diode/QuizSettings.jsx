import { useState, useEffect } from "react";

const QuizSettings = ({ totalMarks, totalQuestions }) => {
  const [quizSettings, setQuizSettings] = useState({
    quizTimeLimitSeconds: 600,
    quizStartTime: "",
    quizEndTime: "",
    totalMarks: 0,
    totalQuestions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchQuizSettings();
  }, []);

  const fetchQuizSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/questions/ieee/diode/settings', {
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
      setQuizSettings({
        quizTimeLimitSeconds: data.quizTimeLimitSeconds || 600,
        quizStartTime: formatDateTimeForInput(data.quizStartTime) || "",
        quizEndTime: formatDateTimeForInput(data.quizEndTime) || "",
        totalMarks: data.totalMarks || 0,
        totalQuestions: data.totalQuestions || 0
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz settings:", error);
      setError("Failed to load quiz settings");
      setLoading(false);
    }
  };

  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  };

  const handleChange = (e) => {
    setQuizSettings({ ...quizSettings, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleTimeChange = (e) => {
    if (e.target.name === "quizTimeLimitMinutes") {
      const seconds = parseInt(e.target.value) * 60;
      setQuizSettings({ ...quizSettings, quizTimeLimitSeconds: seconds });
    } else {
      setQuizSettings({ ...quizSettings, [e.target.name]: e.target.value });
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const settingsToSubmit = {
        quizTimeLimitSeconds: quizSettings.quizTimeLimitSeconds,
        quizStartTime: new Date(quizSettings.quizStartTime).toISOString(),
        quizEndTime: new Date(quizSettings.quizEndTime).toISOString()
      };
      
      console.log("Submitting settings:", settingsToSubmit);
      
      const response = await fetch("http://localhost:8080/questions/ieee/diode/settings/update", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settingsToSubmit),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        setSuccess("Quiz settings updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(responseData.message || "Failed to update quiz settings");
      }
    } catch (error) {
      console.error("Error updating quiz settings:", error);
      setError("An error occurred while updating quiz settings");
    }
  };

  const displayTotalMarks = totalMarks !== undefined ? totalMarks : quizSettings.totalMarks;
  const displayTotalQuestions = totalQuestions !== undefined ? totalQuestions : quizSettings.totalQuestions;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mb-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
        Quiz Settings
      </h2>
      
      <div className="flex justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Questions</p>
          <p className="text-xl font-bold text-gray-800">{displayTotalQuestions}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Marks</p>
          <p className="text-xl font-bold text-gray-800">{displayTotalMarks}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Duration</p>
          <p className="text-xl font-bold text-gray-800">{quizSettings.quizTimeLimitSeconds / 60} min</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Quiz Duration (minutes):</label>
            <input
              type="number"
              name="quizTimeLimitMinutes"
              value={quizSettings.quizTimeLimitSeconds / 60}
              onChange={handleTimeChange}
              min="1"
              max="120"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Quiz Start Time:</label>
            <input
              type="datetime-local"
              name="quizStartTime"
              value={quizSettings.quizStartTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Quiz End Time:</label>
            <input
              type="datetime-local"
              name="quizEndTime"
              value={quizSettings.quizEndTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            />
          </div>
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
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Update Quiz Settings
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Note: These settings apply to the entire quiz, not individual questions.</p>
      </div>
    </div>
  );
};

export default QuizSettings;