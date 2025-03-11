import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have results in location state, use them
    if (location.state && location.state.submitted) {
      setResultData(location.state);
      setLoading(false);
    } else {
      // Otherwise try to fetch from the server
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!userInfo.rollNumber) {
        navigate('/signin');
        return;
      }

      // Fetch results from the server
      fetch(`http://localhost:8080/results/user/${userInfo.rollNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
          setResultData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching results:", error);
          setLoading(false);
        });
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading results...</div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-yellow-100 rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p className="mb-6">We couldn't find any quiz results for you.</p>
          <button
            onClick={() => navigate('/studentdashboard')}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Quiz Submission Successful</h1>
          <p className="text-gray-600">Your quiz has been submitted successfully</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Participant Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{resultData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="font-semibold">{resultData.rollNumber}</p>
            </div>
          </div>
        </div>

        {resultData.score !== undefined && (
          <div className="bg-green-50 p-6 rounded-lg mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Your Score</h2>
            <p className="text-4xl font-bold text-green-600">
              {resultData.score}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mr-4"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;