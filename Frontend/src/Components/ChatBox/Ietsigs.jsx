
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBars, FaTimes, FaTachometerAlt } from 'react-icons/fa';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const IetSig = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredClub, setHoveredClub] = useState(null);

  // Array of club data with IDs, names, and images
  const iet = [
    { id: 1, name: 'CIPHER', image: '/images/cipher.png'},
    { id: 2, name: 'ROVISP', image: '/images/rovisp.png' },
    { id: 3, name: 'TORSION', image: '/images/torsion.png' },
    { id: 4, name: 'VENTURE', image: '/images/venture.png'},
    { id: 5, name: 'INKHEART', image: '/images/inkheart.png'},
    { id: 6, name: 'MEDIA', image: '/images/media.png'},
  ];

  const handleSigClick = (sig) => {
    // Navigate to chat with the specific SIG ID
    navigate(`/iet/${sig.id}/chat`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 px-6 py-4 shadow-lg border-b border-gray-700 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaTachometerAlt className="h-8 w-8 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tech Connect
            </h1>
          </div>
          
          <div className="hidden md:flex">
            <Link to="/ietdashboard" className="hover:text-blue-400 flex items-center gap-2">
              <Home className="h-5 w-5" /> Home
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 animate-fadeDown">
            <div className="flex flex-col space-y-4 px-2 pb-3 pt-2">
              <Link 
                to="/ietdashboard" 
                className="text-gray-300 hover:text-blue-400 flex items-center gap-2 px-3 py-2 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5" /> Home
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-8 px-6 text-center rounded-lg mx-4 sm:mx-8 mt-10 mb-10">
        <h1 className="text-4xl font-bold mb-2">
          IET SIGs
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300">
          Select a SIG to add questions or manage content for its respective domain
        </p>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {iet.map((club) => (
            <div
              key={club.id}
              className="flex flex-col cursor-pointer"
              onMouseEnter={() => setHoveredClub(club.id)}
              onMouseLeave={() => setHoveredClub(null)}
              onClick={() => handleSigClick(club)}
            >
              <div 
                className="rounded-lg shadow-xl overflow-hidden relative group hover:scale-105 transition-all duration-300 h-65 w-75 mx-auto"
                style={{
                  backgroundImage: `url(${club.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t opacity-80 group-hover:opacity-70 transition-opacity"></div>
                
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-30"></div>
              </div>
              <h2 className="text-lg font-semibold mt-2 text-center">
                {club.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6 border-t border-gray-700 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Tech Connect. All rights reserved.
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

export default IetSig;