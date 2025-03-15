import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaQuestionCircle, FaPuzzlePiece } from 'react-icons/fa';

const IetSig = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredClub, setHoveredClub] = useState(null);

  // Array of club data with icons and descriptions
  const clubs = [
    { 
      name: 'Cipher', 
      path: '/getcipherstatus',
      icon: '🔐',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'ROVISP', 
      path: '/getrovispstatus',
      icon: '👁️',
      color: 'from-green-500 to-teal-600'
    },
    { 
      name: 'Venture', 
      path: '/getventurestatus',
      icon: '🚀',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      name: 'Torsion', 
      path: '/gettorsionstatus',
      icon: '⚙️',
      color: 'from-orange-500 to-amber-600'
    },
    { 
      name: 'Inkheart', 
      path: '/getinkheartstatus',
      icon: '✒️',
      color: 'from-red-500 to-rose-600'
    },
    { 
      name: 'Media', 
      path: '/getmediastatus',
      icon: '📷',
      color: 'from-cyan-500 to-sky-600'
    }
  ];

  const handleLogout = () => {
    // Clear localStorage items
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FaPuzzlePiece className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Tech Connect</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/ietdashboard" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none transition duration-300"
                  >
                    <FaSignOutAlt className="h-6 w-6" />
                  </button>
                  <div className="ml-3 bg-indigo-100 rounded-full p-1">
                    <FaUserCircle className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 animate-fadeDown">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Dashboard
              </a>
              <div className="border-transparent hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                <button
                  onClick={handleLogout}
                  className="text-red-500 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Special Interest Groups
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Select a SIG to add questions or manage content for its respective domain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredClub(index)}
              onMouseLeave={() => setHoveredClub(null)}
              onClick={() => navigate(club.path)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-80`}></div>
              <div className="relative p-8 h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">{club.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{club.name}</h2>
                <p className={`text-white text-opacity-90 text-sm transition-opacity duration-300 ${hoveredClub === index ? 'opacity-100' : 'opacity-75'}`}>
                  {club.description}
                </p>
                <div className={`mt-6 bg-white bg-opacity-25 rounded-full px-4 py-2 text-white text-sm font-medium transition-all duration-300 ${hoveredClub === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  Manage Questions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Tech Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Add this for the animations
const style = document.createElement('style');
style.textContent = `
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeDown {
  animation: fadeDown 0.2s ease-out;
}
`;
document.head.appendChild(style);

export default IetSig;