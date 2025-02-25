import React, { useState } from "react";
import { FaBullhorn, FaVideo, FaCalendarAlt, FaUserCircle, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Perform any logout actions here (e.g., clearing tokens)
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">Student Dashboard</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaUserCircle size={20} />
            <span>My Account</span>
          </button>

          {/* Dropdown Menu */}
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

      {/* Main Content */}
      <div className="container mx-auto py-10 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Announcements */}
          <div onClick={() => navigate("/allannouncement")} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
            <FaBullhorn size={40} className="text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Announcements</h3>
          </div>

          {/* Pre Recruitment Talk */}
          <div onClick={() => navigate("/gettalks")} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
            <FaVideo size={40} className="text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Pre Recruitment Talk</h3>
          </div>

          {/* Interview Slots */}
          <div onClick={() => navigate("/addinterviewslots")} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
            <FaCalendarAlt size={40} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Interview Slots</h3>
          </div>

          {/* Online Assessment (OA) */}
          <div onClick={() => navigate("/clubs")} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
            <FaClipboardList size={40} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-3">Online Assessment</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
