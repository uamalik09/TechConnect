import { Link } from "react-router-dom";
import { Home, Info, Mail, HelpCircle, User } from "lucide-react";

const HomePage = () => {
  const clubs = [
    {
      id: "IET",
      name: "Institution of Engineering and Technology",
      description: "Connect with industry leaders and gain access to exclusive resources and events with IET.",
      color: "from-blue-500 to-blue-700",
      lightColor: "bg-blue-50",
      accentColor: "text-blue-600"
    },
    {
      id: "IEEE",
      name: "Institute of Electrical and Electronics Engineers",
      description: "Join the world's largest technical professional organization dedicated to advancing technology.",
      color: "from-teal-500 to-teal-700",
      lightColor: "bg-teal-50",
      accentColor: "text-teal-600"
    },
    {
      id: "ACM",
      name: "Association for Computing Machinery",
      description: "Be part of the premier organization for computing professionals worldwide.",
      color: "from-purple-500 to-purple-700",
      lightColor: "bg-purple-50",
      accentColor: "text-purple-600"
    },
    {
      id: "IE",
      name: "Institution of Engineers",
      description: "Develop your professional skills through workshops, competitions, and networking events.",
      color: "from-red-500 to-red-700",
      lightColor: "bg-red-50",
      accentColor: "text-red-600"
    },
    {
      id: "ISTE",
      name: "Indian Society for Technical Education",
      description: "Enhance your technical knowledge and stay updated with the latest industry trends.",
      color: "from-green-500 to-green-700",
      lightColor: "bg-green-50",
      accentColor: "text-green-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
            Tech Connect
          </a>
          <div className="hidden md:flex space-x-8">
            <NavItem to="/" icon={<Home size={20} />} label="Home" />
            <NavItem to="#" icon={<Info size={20} />} label="About" />
            <NavItem to="#" icon={<Mail size={20} />} label="Contact" />
            <NavItem to="/faqs" icon={<HelpCircle size={20} />} label="FAQs" />
            <NavItem to="/choice" icon={<User size={20} />} label="Account" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-30 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-200 opacity-50"></div>
          <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-indigo-200 opacity-40"></div>
          <div className="absolute bottom-10 right-40 w-32 h-32 rounded-full bg-purple-200 opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-1">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Welcome to Tech Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to innovation, collaboration, and professional growth through premier technical clubs
          </p>
        </div>
      </div>

      {/* Clubs Section */}
      <div id="clubs" className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Discover Our Technical Clubs
        </h2>
        
        <div className="grid grid-cols-1 gap-12">
          {clubs.map((club, index) => (
            <div
              key={index}
              className={`${club.lightColor} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-10 group-hover:opacity-15 transition-opacity`}></div>
                  <img
                    src={`/images/${club.id.toLowerCase()}.jpeg`}
                    alt={club.id}
                    className="w-full h-64 md:h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <span className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${club.color} mr-4 shadow-md`}>
                      <span className="font-bold text-white text-lg">{club.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{club.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {club.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Feature icon="🎓" text="Workshops" color={club.accentColor} />
                    <Feature icon="🏆" text="Competitions" color={club.accentColor} />
                    <Feature icon="🌐" text="Networking" color={club.accentColor} />
                    <Feature icon="💼" text="Industry Connect" color={club.accentColor} />
                  </div>
                  
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">+</div>
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                      </div>
                      <span className="text-sm text-gray-500">180+ members</span>
                    </div>
                    
                    <Link 
                      to={`/clubs/${club.id.toLowerCase()}`} 
                      className={`inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r ${club.color} text-white font-medium shadow-md transition-transform hover:shadow-lg hover:scale-105`}
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard number="5+" label="Technical Clubs" />
            <StatCard number="2000+" label="Active Members" />
            <StatCard number="50+" label="Annual Events" />
            <StatCard number="100+" label="Industry Partners" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Tech Connect</h3>
              <p className="text-gray-600">Connecting students with technical clubs and opportunities.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Clubs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition">FAQs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-800">Connect With Us</h3>
              <div className="flex space-x-4">
                <SocialIcon type="facebook" />
                <SocialIcon type="twitter" />
                <SocialIcon type="instagram" />
                <SocialIcon type="linkedin" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 text-center text-gray-500">
            <p>© 2025 Tech Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Tag Component
const Feature = ({ icon, text, color }) => (
  <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
    <span>{icon}</span>
    <span className={`text-sm font-medium ${color}`}>{text}</span>
  </div>
);

// Stat Card Component
const StatCard = ({ number, label }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center">
    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{number}</p>
    <p className="text-gray-600 mt-2">{label}</p>
  </div>
);

// Social Icon Component
const SocialIcon = ({ type }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition"
  >
    {type === "facebook" && (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )}
    {type === "twitter" && (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    )}
    {type === "instagram" && (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    )}
    {type === "linkedin" && (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )}
  </a>
);

// Navigation Item Component
const NavItem = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition py-1 px-2 rounded-md hover:bg-gray-100"
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

export default HomePage;