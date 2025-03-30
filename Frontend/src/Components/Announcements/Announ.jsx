import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import { 
  FaTachometerAlt,
} from "react-icons/fa";

function ClubPageStu() {
  // Use useParams to get clubId from URL if needed
  // const { clubId } = useParams();
  
  const clubs = [
    { 
      id: 1, 
      name: "Institution of Engineering and Technology",
      shortName: "IET",
      image: '/images/iet.jpeg'
    },
    { 
      id: 2, 
      name: "Institute of Electrical and Electronics Engineers",
      shortName: "IEEE",
      image: '/images/ieee.jpeg'
    },
    { 
      id: 3, 
      name: "Association for Computing Machinery",
      shortName: "ACM",
      image: '/images/acm.jpeg'
    },
    { 
      id: 4, 
      name: "Indian Society for Technical Education",
      shortName: "ISTE",
      image: '/images/iste.jpeg'
    },
    { 
      id: 5, 
      name: "Institution of Engineers",
      shortName: "IE",
      image: '/images/ie.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
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
            <Link to="/studentdashboard" className="hover:text-blue-400 flex items-center gap-2">
              <Home className="h-5 w-5" /> Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-12 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">
          Announcements Portal
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 mb-6">
          Stay updated with the latest news and events from all exclusive clubs on campus. 
          Never miss an important announcement again!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clubs.map((club) => (
            <div key={club.id} className="flex flex-col items-center">
              <Link to={`/getstu${club.shortName.toLowerCase()}announcement`}>
                <div 
                  className="rounded-lg shadow-xl overflow-hidden relative group hover:scale-105 transition-all duration-300 h-40 w-40 flex items-center justify-center bg-white"
                >
                  <img 
                    src={club.image} 
                    alt={`${club.name} logo`} 
                    className="max-h-full max-w-full object-contain p-2" 
                  />
                </div>
                <h2 className="text-lg font-semibold mt-3 text-center sm:text-left">
                  {club.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 TechSociety Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ClubPageStu;