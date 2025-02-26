import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllTalks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Talks</h1>

      {/* IET Talks */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IET Talks</h2>
        <motion.div
          className="bg-blue-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getiettalk")}
        >
          <h2 className="text-white text-xl font-semibold">View IET</h2>
        </motion.div>
      </div>

      {/* IEEE Talks */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IEEE Talks</h2>
        <motion.div
          className="bg-red-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getieeetalk")}
        >
          <h2 className="text-white text-xl font-semibold">View IEEE</h2>
        </motion.div>
      </div>

      {/* ACM Talks */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">ACM Talks</h2>
        <motion.div
          className="bg-green-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getacmtalk")}
        >
          <h2 className="text-white text-xl font-semibold">View ACM</h2>
        </motion.div>
      </div>

      {/* IE Talks */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">IE Talks</h2>
        <motion.div
          className="bg-yellow-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getietalk")}
        >
          <h2 className="text-white text-xl font-semibold">View IE</h2>
        </motion.div>
      </div>

      {/* ISTE Talks */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">ISTE Talks</h2>
        <motion.div
          className="bg-purple-500 p-6 w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/getistetalk")}
        >
          <h2 className="text-white text-xl font-semibold">View ISTE</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default AllTalks;
