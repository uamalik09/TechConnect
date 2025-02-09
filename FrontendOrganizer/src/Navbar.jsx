import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom'; 
import profilePhoto from './profile.png';

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="profile-icon">
          <a href="/Chat">Chat</a>
          <a href="/signout.html">Sign out</a>
          <img src={profilePhoto} alt="Profile Icon" />
        </div>
      </div>
      <div className="taskbar-boxes">
        <Link to="/api/organizer" className="box">Pre Recruitment Talk</Link>
        <Link to="/add-question" className="box">Online Assesment</Link>
        <Link to="/add-interview-slot" className="box">Interview Slots</Link>
      </div> 
    </>
  );
};

export default Navbar;