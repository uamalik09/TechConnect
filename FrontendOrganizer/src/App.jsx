// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddAnnouncement from "./admin";
import OrganizerPage from './OrganizerPage';
import InterviewSlot from './InterviewSlots';
import AdminPage from './QA';
import Navbar from './Navbar';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-announcement" element={<AddAnnouncement />} />
                    <Route path="/api/organizer" element={<OrganizerPage />} />
                    <Route path="/add-interview-slot" element={<InterviewSlot />} />
                    <Route path="/add-question" element={<AdminPage />} />
                    <Route path="/" element={
                    <>
                      <Navbar />
                      <AddAnnouncement />
                    </>
                   } />
               </Routes>
            </div>
        </Router>
    );
};

export default App;

