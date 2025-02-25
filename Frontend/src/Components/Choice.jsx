// import { Link } from "react-router-dom";
// import { FaUserGraduate, FaUserShield } from "react-icons/fa";

// export default function ChoicePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
//       <div className="flex gap-8">
//         {/* Student Card */}
//         <Link to="/login" className="group">
//           <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-blue-700">
//             <FaUserGraduate size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
//             <h2 className="text-2xl font-semibold">Student</h2>
//           </div>
//         </Link>
//         {/* Admin Card */}
//         <Link to="/adminlogin" className="group">
//           <div className="bg-green-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-green-700">
//             <FaUserShield size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
//             <h2 className="text-2xl font-semibold">Admin</h2>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import { FaUserGraduate, FaUserShield } from "react-icons/fa";
// import { useEffect, useState } from "react";

// export default function ChoicePage() {
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const userRole = localStorage.getItem("role");
//     if (userRole === "admin" || userRole === "overallAdmin") {
//       setIsAdmin(true);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>
//       <div className="flex gap-8">
//         {/* Student Card */}
//         <Link to="/login" className="group">
//           <div className="bg-blue-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-blue-700">
//             <FaUserGraduate size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
//             <h2 className="text-2xl font-semibold">Student</h2>
//           </div>
//         </Link>
//         {/* Admin Card - Only visible if assigned as admin */}
//         {isAdmin && (
//           <Link to="/adminlogin" className="group">
//             <div className="bg-green-600 p-6 rounded-lg shadow-lg text-center w-64 hover:scale-105 transition transform hover:bg-green-700">
//               <FaUserShield size={60} className="text-white mx-auto mb-4 group-hover:rotate-6 transition" />
//               <h2 className="text-2xl font-semibold">Admin</h2>
//             </div>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations

export default function ChoicePage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "admin" || userRole === "overallAdmin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Header with NIT Logo */}
      <motion.h1
        className="text-6xl font-extrabold mb-8 animate__animated animate__fadeIn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        National Institute of Technology
      </motion.h1>

      <h2 className="text-4xl font-bold mb-12">Choose Your Role</h2>

      {/* Role Cards */}
      <div className="flex gap-16 animate__animated animate__fadeInUp">
        {/* Student Card */}
        <motion.div
          className="group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/login">
            <div className="bg-blue-800 p-10 rounded-xl shadow-lg text-center w-72 hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:bg-blue-700">
              <FaUserGraduate
                size={80}
                className="text-white mx-auto mb-6 group-hover:rotate-6 transition-all duration-300"
              />
              <h2 className="text-3xl font-semibold">Student</h2>
            </div>
          </Link>
        </motion.div>

        {/* Admin Card - Only visible if assigned as admin */}
        {isAdmin && (
          <motion.div
            className="group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/adminlogin">
              <div className="bg-green-800 p-10 rounded-xl shadow-lg text-center w-72 hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:bg-green-700">
                <FaUserShield
                  size={80}
                  className="text-white mx-auto mb-6 group-hover:rotate-6 transition-all duration-300"
                />
                <h2 className="text-3xl font-semibold">Admin</h2>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Decorative Background Images */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="https://www.nitk.ac.in/sites/all/themes/nitk/images/nitklogo.png" // Use NITK logo or any other relevant image
          alt="NITK Logo"
          className="w-full h-full object-cover opacity-10 blur-md"
        />
      </div>

      {/* Glowing Circles Effect */}
      <div className="absolute inset-0 z-[-2]">
        <div className="animate-pulse bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 opacity-30 rounded-full w-48 h-48 absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="animate-pulse bg-gradient-to-r from-teal-400 to-blue-600 opacity-40 rounded-full w-64 h-64 absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}



