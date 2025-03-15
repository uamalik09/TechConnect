// import React, { useState, useEffect } from "react";
// import { 
//   FaBullhorn, 
//   FaVideo, 
//   FaCalendarAlt, 
//   FaUserCircle, 
//   FaClipboardList, 
//   FaComments, 
//   FaBell, 
//   FaSignOutAlt, 
//   FaUserPlus,
//   FaTachometerAlt,
//   FaBars,
//   FaTimes,
//   FaChevronDown
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState(3);
//   const [userInfo, setUserInfo] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     avatar: null, // Will use default icon if no avatar provided
//     role: "Student"
//   });

//   // Simulating loading user data from localStorage on component mount
//   useEffect(() => {
//     const loadUser = () => {
//       const storedUser = localStorage.getItem("loggedInUser");
//       if (storedUser) {
//         try {
//           setUserInfo(JSON.parse(storedUser));
//         } catch (error) {
//           console.error("Error parsing user info:", error);
//         }
//       }
//     };
  
//     // Run when component mounts
//     loadUser();
  
//     // Listen for changes in localStorage (e.g., new login)
//     window.addEventListener("storage", loadUser);
  
//     return () => {
//       window.removeEventListener("storage", loadUser);
//     };
//   }, []);
  

//   const handleRegister = () => {
//     navigate("/registration");
//     setDropdownOpen(false);
//   };

//   const handleLogout = () => {
//     // Clear user data from localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("authToken");
    
//     // Redirect to login page
//     navigate("/");
//     setDropdownOpen(false);
//   };

//   const handleProfileClick = () => {
//     navigate("/profile");
//     setDropdownOpen(false);
//   };

//   // Dashboard feature cards
//   const dashboardFeatures = [
//     {
//       title: "Announcements",
//       icon: <FaBullhorn size={40} className="text-yellow-400 mx-auto mb-4" />,
//       path: "/allannouncement",
//       description: "View all important announcements and updates"
//     },
//     {
//       title: "Pre Recruitment Talk",
//       icon: <FaVideo size={40} className="text-blue-400 mx-auto mb-4" />,
//       path: "/alltalks",
//       description: "Access pre-recruitment presentations and information"
//     },
//     {
//       title: "Coding Platform",
//       icon: <FaVideo size={40} className="text-blue-400 mx-auto mb-4" />,
//       path: "/allcodelinks",
//       description: "Access coding challenges and practice environments"
//     },
//     {
//       title: "Interview Slots",
//       icon: <FaCalendarAlt size={40} className="text-green-400 mx-auto mb-4" />,
//       path: "/registration",
//       description: "Book and manage your interview appointments"
//     },
//     {
//       title: "Online Assessment",
//       icon: <FaClipboardList size={40} className="text-purple-400 mx-auto mb-4" />,
//       path: "/clubs",
//       description: "Take online assessments and track your progress"
//     },
//     {
//       title: "Quiz Status",
//       icon: <FaClipboardList size={40} className="text-purple-400 mx-auto mb-4" />,
//       path: "/clubstatus",
//       description: "Check your quiz results and completion status"
//     },
//     {
//       title: "ChatBox",
//       icon: <FaComments size={40} className="text-indigo-400 mx-auto mb-4" />,
//       path: "/club",
//       description: "Communicate with mentors and peers"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Navbar */}
//       <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Logo and brand */}
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <FaTachometerAlt className="h-8 w-8 text-blue-400" />
//                 <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                   StudentPortal
//                 </span>
//               </div>
              
//               {/* Navigation items - Desktop */}
//               <div className="hidden md:ml-6 md:flex md:space-x-4">
//                 <button className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition">
//                   Dashboard
//                 </button>
//                 <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 transition">
//                   Courses
//                 </button>
//                 <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 transition">
//                   Calendar
//                 </button>
//                 <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 transition">
//                   Resources
//                 </button>
//               </div>
//             </div>

//             {/* User controls - Desktop */}
//             <div className="hidden md:flex md:items-center md:space-x-4">
//               {/* Notifications */}
//               <button className="p-2 rounded-full text-gray-400 hover:text-white relative">
//                 <FaBell size={20} />
//                 {notifications > 0 && (
//                   <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
//                     {notifications > 9 ? '9+' : notifications}
//                   </span>
//                 )}
//               </button>

//               {/* User dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
//                 >
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                     {userInfo.avatar ? (
//                       <img src={userInfo.avatar} alt="User" className="w-8 h-8 rounded-full" />
//                     ) : (
//                       <FaUserCircle size={24} />
//                     )}
//                   </div>
//                   <div className="flex flex-col items-start">
//                     <span className="text-sm font-medium">{userInfo.name}</span>
//                     <span className="text-xs text-gray-400">{userInfo.role}</span>
//                   </div>
//                   <FaChevronDown size={14} className="text-gray-400" />
//                 </button>

//                 {/* User dropdown menu */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 shadow-lg rounded-lg overflow-hidden z-10">
//                     <div className="px-4 py-3 border-b border-gray-700">
//                       <p className="text-sm font-medium">{userInfo.name}</p>
//                       <p className="text-xs text-gray-400 mt-1 truncate">{userInfo.email}</p>
//                     </div>
                    
//                     <button
//                       onClick={handleProfileClick}
//                       className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
//                     >
//                       <FaUserCircle className="mr-2" size={16} />
//                       Profile
//                     </button>
                    
//                     <button
//                       onClick={handleRegister}
//                       className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
//                     >
//                       <FaUserPlus className="mr-2" size={16} />
//                       Register
//                     </button>
                    
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
//                     >
//                       <FaSignOutAlt className="mr-2" size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Mobile menu button */}
//             <div className="flex md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
//               >
//                 {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <button className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 w-full text-left">
//                 Dashboard
//               </button>
//               <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 w-full text-left">
//                 Courses
//               </button>
//               <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 w-full text-left">
//                 Calendar
//               </button>
//               <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 w-full text-left">
//                 Resources
//               </button>
//             </div>
//             <div className="pt-4 pb-3 border-t border-gray-700">
//               <div className="flex items-center px-4">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                     {userInfo.avatar ? (
//                       <img src={userInfo.avatar} alt="User" className="w-10 h-10 rounded-full" />
//                     ) : (
//                       <FaUserCircle size={28} />
//                     )}
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <div className="text-base font-medium">{userInfo.name}</div>
//                   <div className="text-sm font-medium text-gray-400">{userInfo.email}</div>
//                 </div>
//                 <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-white">
//                   <FaBell size={20} />
//                   {notifications > 0 && (
//                     <span className="absolute top-1 right-1 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
//                       {notifications}
//                     </span>
//                   )}
//                 </button>
//               </div>
//               <div className="mt-3 px-2 space-y-1">
//                 <button
//                   onClick={handleProfileClick}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 w-full text-left"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={handleRegister}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 w-full text-left"
//                 >
//                   Register
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700 w-full text-left"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         {/* Welcome section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Welcome back, {userInfo.name}!</h1>
//           <p className="text-gray-400">
//             Access all your student resources and manage your activities from this dashboard.
//           </p>
//         </div>

//         {/* Dashboard features grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {dashboardFeatures.map((feature, index) => (
//             <div 
//               key={index}
//               onClick={() => navigate(feature.path)}
//               className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 group"
//             >
//               <div className="bg-gray-700 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-600 transition-all">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-400 text-center">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 border-t border-gray-700 mt-10 py-6 text-center text-gray-400 text-sm">
//         <div className="container mx-auto px-4">
//           <p>© 2025 StudentPortal. All rights reserved.</p>
//           <div className="mt-2 flex justify-center space-x-4">
//             <a href="#" className="hover:text-white transition">Privacy Policy</a>
//             <a href="#" className="hover:text-white transition">Terms of Service</a>
//             <a href="#" className="hover:text-white transition">Help Center</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default StudentDashboard;

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
      path: "/allannouncement",
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
      path: "/allcodelinks",
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