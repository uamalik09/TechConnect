import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    return { token: null, role: "" };
  }
};
const IeeeTalk = () => {
  const [title, setTitle] = useState("");
  const [talkUrl, setTalkUrl] = useState("");
  const [date, setDate] = useState("");
  const [talks, setTalks] = useState([]);
  const [userRole, setUserRole] = useState("null");
  const navigate = useNavigate();
  const userData = getUserData();

  useEffect(() => {
    if (!userData||!userData.token) {
      console.error("No token found, redirecting to login.");
      navigate("/login");
      return;
    }
    if (userData.role) {
      setUserRole(userData.role);
      if (userData.role !== "ieee") {
        console.error("Unauthorized role, redirecting.");
        navigate("/home");
      }
    }
  }, [userData.role, navigate]);


  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    try {
      
      const response = await axios.get("https://tech--connect.azurewebsites.net/api/ieee/gettalks", {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      if (Array.isArray(response.data)) {
        setTalks(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching talks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post(
        "https://tech--connect.azurewebsites.net/api/ieee/addtalk",
        { title, talkUrl, date },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );

      if (response.data && response.data._id) {
        setTalks([...talks, response.data]);
      } else {
        console.error("Failed to add talk, invalid response:", response.data);
      }

      setTitle("");
      setTalkUrl("");
      setDate("");
    } catch (error) {
      console.error("Error adding talk:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid talk ID for deletion:", id);
      return;
    }

    try {
     
      await axios.delete(`https://tech--connect.azurewebsites.net/api/ieee/deletetalk/${id}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      setTalks(talks.filter((talk) => talk._id !== id));
    } catch (error) {
      console.error("Error deleting talk:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Add Talk</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <input
          type="text"
          placeholder="Talk Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={talkUrl}
          onChange={(e) => setTalkUrl(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
          Add Talk
        </button>
      </form>

      <h2 className="text-3xl font-bold mt-6">Talks</h2>
      <ul className="w-full max-w-lg">
        {talks.map((talk, index) => (
          <li key={talk._id || index} className="bg-gray-800 p-4 mt-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{talk.title}</h3>
            <p className="text-gray-400 text-sm">Date: {new Date(talk.date).toLocaleDateString()}</p>
            <div className="flex justify-center mt-2">
              <iframe
                width="100%"
                height="315"
                src={talk.talkUrl.replace("watch?v=", "embed/")}
                title={talk.title}
                frameBorder="0"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <button
              onClick={() => handleDelete(talk._id)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IeeeTalk;
