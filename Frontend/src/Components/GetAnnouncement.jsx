import React, { useState, useEffect } from "react";
import axios from "axios";

const GetAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements when component mounts
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getannouncement");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Latest Announcements</h2>
      <div className="max-w-2xl mx-auto">
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">No announcements available.</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((ann) => (
              <li key={ann._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{ann.title}</h3>
                <p className="text-gray-300">{ann.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GetAnnouncements;
