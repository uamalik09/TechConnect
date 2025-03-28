import React, { useState, useEffect } from "react";
import { 
  FaBullhorn, 
  FaVideo, 
  FaCalendarAlt, 
  FaUserCircle, 
  FaQuestionCircle, 
  FaSignOutAlt,
  FaClipboardList, 
  FaChartBar, 
  FaTachometerAlt,
  FaBell,
  FaCog,
  FaListAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const isteDashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Student",
    email: "",
    role: "iste",
  });

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        } else {
          const name = localStorage.getItem("loggedInUser");
          const role = localStorage.getItem("userRole");

          if (name) {
            setUserInfo((prev) => ({
              ...prev,
              name: name,
              role: role || "Student",
            }));
          }
        }
      } catch (error) {
        console.log("Error parsing user info:", error);
        const name = localStorage.getItem("loggedInUser");
        const role = localStorage.getItem("userRole");

        if (name) {
          setUserInfo({
            name: name,
            email: "",
            role: role || "Student",
          });
        }
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    setDropdownOpen(false); // Close dropdown on logout
    navigate("/");
  };

  // Admin action cards data for easy mapping
  const adminActions = [
    {
      icon: <FaBullhorn size={40} className="text-yellow-400" />,
      title: "Add Announcement",
      path: "/isteannouncement",
      color: "from-yellow-500 to-amber-600",
      hoverColor: "hover:from-yellow-600 hover:to-amber-700"
    },
    {
      icon: <FaVideo size={40} className="text-blue-400" />,
      title: "Add Talk",
      path: "/addistetalk",
      color: "from-blue-500 to-indigo-600",
      hoverColor: "hover:from-blue-600 hover:to-indigo-700"
    },
    {
      icon: <FaCalendarAlt size={40} className="text-green-400" />,
      title: "Add Coding Link",
      path: "/istecode",
      color: "from-green-500 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:to-emerald-700"
    },
    {
      icon: <FaClipboardList size={40} className="text-purple-400" />,
      title: "Online Assessment",
      path: "/iste",
      color: "from-purple-500 to-violet-600",
      hoverColor: "hover:from-purple-600 hover:to-violet-700"
    },
    {
      icon: <FaChartBar size={40} className="text-rose-400" />,
      title: "Get Results",
      path: "/isteresults",
      color: "from-rose-500 to-pink-600",
      hoverColor: "hover:from-rose-600 hover:to-pink-700"
    },
    {
      icon: <FaQuestionCircle size={40} className="text-cyan-400" />,
      title: "Clarify Doubts",
      path: "/istesigs",
      color: "from-cyan-500 to-sky-600",
      hoverColor: "hover:from-cyan-600 hover:to-sky-700"
    },
    {
      icon: <FaQuestionCircle size={40} className="text-cyan-400" />,
      title: "Registered Student Details",
      path: "/istedetails",
      color: "from-cyan-500 to-sky-600",
      hoverColor: "hover:from-cyan-600 hover:to-sky-700"
    },
    {
      icon: <FaListAlt size={40} className="text-cyan-400" />,
      title: "Preference Form of Students",
      path: "/adminpreferences",
      color: "from-cyan-500 to-sky-600",
      hoverColor: "hover:from-cyan-600 hover:to-sky-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <nav className="bg-black/60 backdrop-blur-lg p-4 shadow-xl border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative p-2 bg-blue-500/20 rounded-full mr-3">
              <FaTachometerAlt className="h-6 w-6 text-blue-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Tech Connect
            </h1>
          </div>

          <div className="flex items-center space-x-4">

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-600 transition shadow-md"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-inner">
                  <FaUserCircle size={20} />
                </div>
                <span>{userInfo.name || "User"}</span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden z-10 border border-gray-700 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{userInfo.email}</p>
                    <p className="text-xs bg-gradient-to-r from-blue-500 to-indigo-600 rounded px-2 py-1 mt-2 inline-block">
                      {userInfo.role}
                    </p>
                  </div>
                  <div className="py-1">
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
        </div>
      </nav>

      <div className="container mx-auto py-10 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 inline-block relative">
            ISTE Dashboard
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Welcome to the ISTE admin panel. Manage announcements, talks, interviews, and more from one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminActions.map((action, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700 group-hover:border-gray-600 transition-all duration-300 overflow-hidden">
                {/* Pseudo-element glow effect */}
                <div className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r ${action.color} opacity-30 group-hover:${action.hoverColor} group-hover:opacity-40 group-hover:animate-shine`}></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-6">
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">{action.title}</h3>
                  <button
                    onClick={() => navigate(action.path)}
                    className={`w-full bg-gradient-to-r ${action.color} ${action.hoverColor} text-white py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl`}
                  >
                    Access
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-black/40 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>© 2025 Tech Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Add this for the shine animation
const style = document.createElement('style');
style.textContent = `
@keyframes shine {
  100% {
    left: 125%;
  }
}
.animate-shine {
  animation: shine 1.5s;
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

export default isteDashboard;
