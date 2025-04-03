import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
const GetstuAcmAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const userData = getUserData();
    
    

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    // Redirect to login if no valid user data
    if (!userData||userData.role!="user") {
      console.error("No authenticated user found");
      navigate("/home");
      return;
    }

    try {
      
      const response = await axios.get("https://tech--connect.azurewebsites.net/api/acm/get/student", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        withCredentials: true,
      });
      
      console.log("Fetched Announcements:", response.data);
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <motion.div
        className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">ACM Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">No announcements yet.</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((ann) => (
              <motion.li
                key={ann._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold">{ann.title}</h3>
                <p className="text-gray-300">{ann.message}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default GetstuAcmAnnouncements;
