import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const IetAnnouncements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/iet/get"
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/iet/add",
        { title, message }
      );
      setAnnouncements([...announcements, response.data]); // Update UI instantly
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/iet/delete/${id}`);
      setAnnouncements(announcements.filter((ann) => ann._id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
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
        <h2 className="text-2xl font-bold text-center mb-4">IET Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring focus:ring-blue-500"
          />
          <button onClick={() => handleSubmit}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-all p-3 rounded-lg font-semibold"
          >
            Add Announcement
          </button>
        </form>
      </motion.div>

      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-400">No announcements yet.</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((ann) => (
              <motion.li
                key={ann._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold">{ann.title}</h3>
                <p className="text-gray-300">{ann.message}</p>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IetAnnouncements;
