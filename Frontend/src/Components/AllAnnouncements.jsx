import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllAnnouncement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Announcements</h1>

      {/* IET ANNOUNCEMENTS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IET Announcements</h2>
        <motion.div
          className="bg-blue-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getietannouncement")}
        >
          <h2 className="text-white text-xl font-semibold">View IET</h2>
        </motion.div>
      </div>

      {/* IEEE ANNOUNCEMENTS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IEEE Announcements</h2>
        <motion.div
          className="bg-red-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getieeeannouncement")}
        >
          <h2 className="text-white text-xl font-semibold">View IEEE</h2>
        </motion.div>
      </div>

      {/* ACM ANNOUNCEMENTS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">ACM Announcements</h2>
        <motion.div
          className="bg-green-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getacmannouncement")}
        >
          <h2 className="text-white text-xl font-semibold">View ACM</h2>
        </motion.div>
      </div>

      {/* IE ANNOUNCEMENTS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IE Announcements</h2>
        <motion.div
          className="bg-yellow-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getieannouncement")}
        >
          <h2 className="text-white text-xl font-semibold">View IE</h2>
        </motion.div>
      </div>

      {/* ISTE ANNOUNCEMENTS */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">ISTE Announcements</h2>
        <motion.div
          className="bg-purple-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getisteannouncement")}
        >
          <h2 className="text-white text-xl font-semibold">View ISTE</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default AllAnnouncement;
