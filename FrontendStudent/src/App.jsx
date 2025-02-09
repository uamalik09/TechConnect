// import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewAnnouncements from "./view";
import TalksPage from './TalksPage';
import InterviewSlot from "./InterviewSlots";
import QuizPage from './QA';
import ResultsPage from "./result";
import ClubPage from './ClubPage';
import SigPage from './SigPage';
import SigDetails from './SigDetails';
import Navbar from './Navbar';
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/view-announcements" element={<ViewAnnouncements />} />
                    <Route path="/api/talks" element={<TalksPage />} />
                    <Route path="/get-interview-slots" element={<InterviewSlot />} />
                    <Route path="/get-question" element={<QuizPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/oa" element={<ClubPage />} /> 
                    <Route path="/sigs/:clubId" element={<SigPage />} />  
                    <Route path="/sig-details/:clubId/:sigId" element={<SigDetails />} />
                    <Route path="/" element={
                    <>
                      <Navbar />
                      <ViewAnnouncements />
                    </>
                   } />
               </Routes>
            </div>
        </Router>
    );
};

export default App;

