import React, { useState, useEffect } from "react";
import { 
  FaBullhorn, 
  FaVideo, 
  FaCalendarAlt, 
  FaUserCircle, 
  FaClipboardList, 
  FaHourglassStart,
  FaComments, 
  FaSignOutAlt, 
  FaUserPlus,
  FaTachometerAlt,
  FaCode,
  FaListAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Student",
    email: "",
    role: "Student"
  });

  // Load user info from localStorage safely
  useEffect(() => {
    const loadUser = () => {
      try {
        // First try to get the JSON object
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } else {
          // Fall back to individual values if JSON not available
          const name = localStorage.getItem("loggedInUser");
          const role = localStorage.getItem("userRole");
          
          if (name) {
            setUserInfo(prev => ({
              ...prev,
              name: name,
              role: role || "Student"
            }));
          }
        }
      } catch (error) {
        console.log("Error parsing user info:", error);
        // If JSON parsing fails, try to get the simple string values
        const name = localStorage.getItem("loggedInUser");
        const role = localStorage.getItem("userRole");
        
        if (name) {
          setUserInfo({
            name: name,
            email: "",
            role: role || "Student"
          });
        }
      }
    };
    
    loadUser();
  }, []);

  const handleRegister = () => {
    navigate("/registration");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    
    // Redirect to home/login page
    navigate("/");
    setDropdownOpen(false);
  };

  // Dashboard feature cards
  const dashboardFeatures = [
    {
      title: "Announcements",
      icon: <FaBullhorn size={40} className="text-yellow-400" />,
      path: "/getstuannouncement",
      description: "View important announcements"
    },
    {
      title: "Pre Recruitment Talk",
      icon: <FaVideo size={40} className="text-blue-400" />,
      path: "/alltalks",
      description: "Access recruitment presentations"
    },
    {
      title: "Coding Platform",
      icon: <FaCode size={40} className="text-red-400" />,
      path: "/allcodestulinks",
      description: "Access coding challenges"
    },
    {
      title: "Online Assessment",
      icon: <FaClipboardList size={40} className="text-purple-400" />,
      path: "/clubs",
      description: "Take assessments and tests"
    },
    {
      title: "Quiz Status",
      icon: <FaHourglassStart size={40} className="text-orange-400" />,
      path: "/clubstatus",
      description: "Check quiz results"
    },
    {
      title: "ChatBox",
      icon: <FaComments size={40} className="text-indigo-400" />,
      path: "/club",
      description: "Connect with mentors and peers"
    },
    {
      title: "Preference Form",
      icon: <FaListAlt size={40} className="text-indigo-400" />,
      path: "/preferenceform",
      description: "Give your preference oder for clubs"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FaTachometerAlt className="h-8 w-8 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tech Connect
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FaUserCircle size={20} />
              </div>
              <span>{userInfo.name || "User"}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg overflow-hidden z-10 border border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium">{userInfo.name}</p>
                  <p className="text-xs text-gray-400 mt-1 truncate">{userInfo.email}</p>
                  <p className="text-xs bg-blue-500 rounded px-2 py-1 mt-2 inline-block">{userInfo.role}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleRegister}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-700 transition"
                  >
                    <FaUserPlus className="mr-3 text-gray-400" />
                    Register
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-700 text-red-400 transition"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Welcome, {userInfo.name}!</h2>
          <p className="text-gray-400">Access all your resources here</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-200 border border-gray-700 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-gray-700 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Tech Connect © {new Date().getFullYear()} | All Rights Reserved</p>
          <p className="mt-2">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a> | 
            <a href="#" className="hover:text-blue-400 transition ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;