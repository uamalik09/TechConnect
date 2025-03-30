import React from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { Menu, Home } from 'lucide-react';

function SigPage() {
  const { clubId } = useParams();  // Get club ID from URL

  // Hardcoded SIGs for each club with added image paths
  const sigs = {
    1: [
      { id: 1, name: 'CIPHER', image: '/images/cipher.png'},
      { id: 2, name: 'ROVISP', image: '/images/rovisp.png' },
      { id: 3, name: 'TORSION', image: '/images/torsion.png' },
      { id: 4, name: 'VENTURE', image: '/images/venture.png'},
      { id: 5, name: 'INKHEART', image: '/images/inkheart.png'},
      { id: 6, name: 'MEDIA', image: '/images/media.png'},
    ],
    2: [
      { id: 1, name: 'COMPSOC', image: '/images/compsoc.png'},
      { id: 2, name: 'DIODE', image: '/images/diode.png' },
      { id: 3, name: 'PISTON', image: '/images/piston.png' },
    ],
    3: [
      { id: 1, name: 'SANGANITRA', image: '/images/sanganitra.png'},
      { id: 2, name: 'YANTRIKA', image: '/images/yantrika.png' },
      { id: 3, name: 'VIDYUT', image: '/images/vidyut.png'},
      { id: 4, name: 'KAARYAVARTA', image: '/images/kaaryavarta.png'},
      { id: 5, name: 'SAAHITYA', image: '/images/saahitya.png' },
      { id: 6, name: 'ABHIVYAKTA', image: '/images/abhivyakta.png'},
    ],
    4: [
      { id: 1, name: 'CATALYST', image: '/images/catalyst.png'},
      { id: 2, name: 'CHARGE', image: '/images/charge.png'},
      { id: 3, name: 'CHRONICLE', image: '/images/chronicle.png' },
      { id: 4, name: 'CLUTCH', image: '/images/clutch.png' },
      { id: 5, name: 'CONCRETE', image: '/images/concrete.png'},
      { id: 6, name: 'CREDIT', image: '/images/credit.png'},
      { id: 7, name: 'CRYPT', image: '/images/crypt.png'},
      { id: 8, name: 'CREATE', image: '/images/create.png'},
    ],
    5: [
      { id: 1, name: 'CAPITAL', image: '/images/capital.png' },
      { id: 2, name: 'CODE', image: '/images/code.png' },
      { id: 3, name: 'GADGET', image: '/images/gadget.png'},
      { id: 4, name: 'GARAGE', image: '/images/garage.png'},
      { id: 5, name: 'ROBOTICS', image: '/images/robotics.png'},
      { id: 6, name: 'SCRIPT', image: '/images/script.png'},
      { id: 7, name: 'TECTONIC', image: '/images/tectonic.png'},
    ],
  };

  const selectedSigs = sigs[clubId] || [];

  // Club names mapping
  const clubNames = {
    '1': 'IET',
    '2': 'IEEE',
    '3': 'ACM',
    '4': 'ISTE',
    '5': 'IE'
  };

  // Get club name
  const clubName = clubNames[clubId] || 'Club';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 px-4">
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
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-8 px-6 text-center rounded-lg mb-10">
        <h1 className="text-4xl font-bold mb-2">
          {clubName} SIGs
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300">
          Explore the Special Interest Groups within {clubName}
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {selectedSigs.map((sig) => (
          <div
            key={sig.id}
            className="flex flex-col"
          >
            <Link to={`/sig-details/${clubId}/${sig.id}`}>
              <div 
                className="rounded-lg shadow-xl overflow-hidden relative group hover:scale-105 transition-all duration-300 h-65 w-75 mx-auto"
                style={{
                  backgroundImage: `url(${sig.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${sig.color } opacity-80 group-hover:opacity-70 transition-opacity`}></div>
                
                {/* Bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-30"></div>
              </div>
              <h2 className="text-lg font-semibold mt-2 text-center">
                {sig.name}
              </h2>
              {/* <div className="mt-2 text-center">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm">
                  Get Started
                </button>
              </div> */}
            </Link>
          </div>
        ))}
      </div>
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
}

export default SigPage;