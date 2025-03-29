import { Link } from "react-router-dom";
import { FaUserGraduate, FaUserShield, FaBars, FaTimes, FaHome, FaInfoCircle, FaPhone, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChoicePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole === "admin" || userRole === "overallAdmin") {
      setIsAdmin(true);
    }
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  const floatingBubbleVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-600 to-gray-700 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"
          />
        </div>

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingBubbleVariants}
            animate="animate"
            custom={i}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img 
                src="/images/nitk.jpeg" 
                alt="NITK Logo" 
                className="h-12 mr-4"
              />
              <span className="text-xl font-bold">NITK Portal</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex space-x-8 items-center"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a href="/home" variants={navItemVariants} className="hover:text-blue-300 transition-colors">
                <FaHome className="inline mr-2" /> Home
              </motion.a>
            </motion.div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setNavOpen(!navOpen)}
                className="focus:outline-none"
              >
                {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800 md:hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <a href="/home" className="hover:text-blue-300 transition-colors py-2">
                  <FaHome className="inline mr-2" /> Home
                </a>
                <a 
                  href="#" 
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md flex items-center justify-center transition-colors"
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-24 relative z-1 flex flex-col items-center justify-center min-h-screen">
        {/* NITK Logo & Name */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-blue-100">
            National Institute of Technology
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300">Surathkal, Karnataka</h2>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mt-6"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        <motion.h3 
          className="text-2xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <span className="text-blue-100">
            Select Your Portal Access
          </span>
        </motion.h3>

        {/* Role Selection Cards */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center items-center">
          {/* Student Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            whileHover="hover"
            className="w-full max-w-xs"
          >
            <Link to="/login" className="block">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-10 rounded-lg shadow-xl text-center hover:shadow-blue-800/10 transition-all duration-300 border border-gray-700">
                <div className="bg-blue-900/20 p-5 rounded-full inline-block mb-6">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaUserGraduate size={70} className="text-blue-400" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold mb-3">Student</h2>
                <p className="text-gray-400 text-sm">Access your student portal for classes, assignments and resources</p>
                <motion.div
                  className="mt-6 py-2 px-4 bg-blue-800 rounded-md text-sm font-medium inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  Continue as Student
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Admin Card - Only visible if assigned as admin */}
          {isAdmin && (
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate={loaded ? "visible" : "hidden"}
              whileHover="hover"
              className="w-full max-w-xs"
            >
              <Link to="/adminlogin" className="block">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-10 rounded-lg shadow-xl text-center hover:shadow-slate-800/10 transition-all duration-300 border border-slate-700">
                  <div className="bg-slate-800/40 p-5 rounded-full inline-block mb-6">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaUserShield size={70} className="text-slate-300" />
                    </motion.div>
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Admin</h2>
                  <p className="text-gray-400 text-sm">Manage system settings, user accounts and institutional data</p>
                  <motion.div
                    className="mt-6 py-2 px-4 bg-slate-700 rounded-md text-sm font-medium inline-flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    Continue as Admin
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Footer Note */}
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p>© 2025 National Institute of Technology, Surathkal</p>
          <p className="mt-2">For assistance, please contact the IT helpdesk</p>
        </motion.div>
      </div>
    </div>
  );
}