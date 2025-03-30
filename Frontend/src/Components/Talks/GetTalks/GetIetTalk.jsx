import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const GetTalks = () => {
  const navigate = useNavigate();
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    const userData = getUserData();
     // Redirect to login if no valid user data
     if (!userData||userData.role!="user") {
      console.error("No authenticated user found");
      navigate("/home");
      return;
    }
    try {
     
      const response = await axios.get("http://localhost:8080/api/iet/gettalks", {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      if (Array.isArray(response.data)) {
        setTalks(response.data);
      } else {
        setError("Unexpected response format");
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError("Error fetching talks. Please try again later.");
      console.error("Error fetching talks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">IET Talks</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading talks...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : talks.length === 0 ? (
        <p className="text-center text-gray-400">No talks available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {talks.map((talk) => (
            <div key={talk._id} className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
              <p className="text-sm text-gray-400 mb-3">Date: {new Date(talk.date).toLocaleDateString()}</p>
              
              {talk.talkUrl && talk.talkUrl.includes("watch?v=") ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full rounded-lg"
                    src={talk.talkUrl.replace("watch?v=", "embed/")}
                    title={talk.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Invalid video URL</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetTalks;
