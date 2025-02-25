// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, Search } from "lucide-react"; // Icons

// const Home = () => {
//     return (
//         <nav className="bg-white border-gray-200 dark:bg-gray-900">
//             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                 <a href="{{< param homepage >}}/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tech Connect</span>
//                 </a>
//                 <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//                     <span className="sr-only">Open main menu</span>
//                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
//                     </svg>
//                 </button>
//                 <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//                     <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                         <li>
//                             <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">FAQs</a>
//                         </li>
//                         <li>
//                             <a href="/choice" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Account</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>

//     );
// };

// export default Home;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, Search } from "lucide-react"; // Icons

// const Home = () => {
//     return (
//         <div>
//             <nav className="bg-white border-gray-200 dark:bg-gray-900">
//                 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                     <a href="{{< param homepage >}}/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tech Connect</span>
//                     </a>
//                     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//                         <span className="sr-only">Open main menu</span>
//                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
//                         </svg>
//                     </button>
//                     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//                         <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                             <li>
//                                 <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">FAQs</a>
//                             </li>
//                             <li>
//                                 <a href="/choice" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Account</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>

//             {/* Card Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
//                 {['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'].map((card, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300">
//                         <img src={`https://via.placeholder.com/300x200?text=${card}`} alt={card} className="w-full h-48 object-cover rounded-lg mb-4" />
//                         <h3 className="text-xl font-semibold text-gray-800">{card}</h3>
//                         <p className="text-gray-600 mt-2">This is a description for {card}. You can add more details or features about this card here.</p>
//                         <Link to="#" className="text-blue-600 mt-4 inline-block hover:underline">More Details</Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { Home, Info, Mail, HelpCircle, User } from "lucide-react";

const HomePage = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 shadow-md p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold tracking-wider text-blue-400">
                        Tech Connect
                    </a>
                    <div className="hidden md:flex space-x-6">
                        <NavItem to="/" icon={<Home size={20} />} label="Home" />
                        <NavItem to="#" icon={<Info size={20} />} label="About" />
                        <NavItem to="#" icon={<Mail size={20} />} label="Contact" />
                        <NavItem to="/faqs" icon={<HelpCircle size={20} />} label="FAQs" />
                        <NavItem to="/choice" icon={<User size={20} />} label="Account" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="text-center py-12">
                <h2 className="text-4xl font-bold text-white mb-4">Welcome to Tech Connect</h2>
                <p className="text-lg text-gray-400">Your gateway to innovation and collaboration</p>
            </div>

            {/* Cards Section */}
            <div className="flex flex-col items-center space-y-8 p-8">
                {["Innovation Hub", "Tech Talks", "Workshops", "Hackathons", "Networking"].map((card, index) => (
                    <div
                        key={index}
                        className="w-full max-w-4xl p-6 flex items-center rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        <img
                            src={`https://via.placeholder.com/400x200?text=${card}`}
                            alt={card}
                            className="w-48 h-32 object-cover rounded-md mr-6"
                        />
                        <div>
                            <h3 className="text-2xl font-semibold">{card}</h3>
                            <p className="text-gray-300 mt-2">
                                Explore amazing opportunities with {card}. Join now!
                            </p>
                            <Link to="#" className="text-blue-400 mt-4 inline-block hover:text-blue-300">
                                Learn More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Navigation Item Component
const NavItem = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition">
        {icon}
        <span>{label}</span>
    </Link>
);

export default HomePage;


