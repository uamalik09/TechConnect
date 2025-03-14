import React, { useState } from "react";
import { FaBullhorn, FaVideo, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { FaClipboardList, FaChartBar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const IetDashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">Ieee Dashboard</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaUserCircle size={20} />
            <span>My Account</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-lg overflow-hidden">
               <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <FaBullhorn size={40} className="text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Add Announcement</h3>
            <button
              onClick={() => navigate("/ieeeannouncement")}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <FaVideo size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Add Talk</h3>
            <button
              onClick={() => navigate("/addieeetalk")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <FaCalendarAlt size={40} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Add Interview Slot</h3>
            <button
              onClick={() => navigate("/ieeeinterviewslots")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
           <div  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
                     <FaClipboardList size={40} className="text-purple-400 mx-auto mb-4" />
                     <h3 className="text-xl font-semibold text-center mb-3">Online Assessment</h3>
                     <button
              onClick={() => navigate("/ieee")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            < FaChartBar  size={40} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Get results</h3>
            <button
              onClick={() => navigate("/ieeeresults")}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
            >
              Get
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <FaCalendarAlt size={40} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Registered Student Details</h3>
            <button
              onClick={() => navigate("/ieeedetails")}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Get
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default IetDashboard;
