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
        <Link to="/api/talks" className="box">Pre Recruitment Talk</Link>
        <Link to="get-interview-slots" className="box">Interview Slots</Link>
        <Link to="/oa" className="box">Online Assesment</Link>
      </div>
    </>
  );
};

export default Navbar;
