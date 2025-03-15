import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Home } from "lucide-react";

const AllCode = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const announcementItems = [
    { title: "IET Announcements", color: "bg-blue-600", route: "/ietlink", icon: "🔬" },
    { title: "IEEE Announcements", color: "bg-red-600", route: "/ieeelink", icon: "⚡" },
    { title: "ACM Announcements", color: "bg-green-600", route: "/acmlink", icon: "💻" },
    { title: "IE Announcements", color: "bg-yellow-600", route: "/ielink", icon: "🔧" },
    { title: "ISTE Announcements", color: "bg-purple-600", route: "/istelink", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Simplified Navbar */}
      <nav className="bg-gray-800 px-6 py-4 shadow-lg border-b border-gray-700 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Menu className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Tech Connect
            </span>
          </div>

          <div className="hidden md:flex">
            <button className="hover:text-blue-400 flex items-center gap-2" onClick={() => navigate('/studentdashboard')}>
              <Home className="h-5 w-5" /> Home
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-12 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">
          Coding Portal
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 mb-6">
          The best code is like magic—clear, powerful, and unforgettable.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6 md:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {announcementItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-3 flex items-center">
                <span className="mr-2">{item.icon}</span> {item.title}
              </h2>
              <motion.div
                className={`${item.color} p-6 h-52 rounded-xl shadow-xl flex items-center justify-center cursor-pointer overflow-hidden relative group`}
                whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.route)}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h2 className="text-white text-xl font-bold mb-2">View {item.title.split(" ")[0]}</h2>
                  <p className="text-white text-sm opacity-80">Latest updates and events</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-30"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 TechSociety Hub. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400">About</a>
            <a href="#" className="text-gray-400 hover:text-blue-400">Contact</a>
            <a href="#" className="text-gray-400 hover:text-blue-400">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllCode;