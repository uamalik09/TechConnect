import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreRecruitmentTalkPage from './pre-recruitment-talk'; 
import Navbar from './Navbar';
import Announcements from './Announcements';
import OAPage from './OA'
import InterviewSlotsPage from './InterviewSlots';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Announcements />
          </>
        } />
        <Route path="/pre-recruitment-talk" element={<PreRecruitmentTalkPage />} />
        <Route path='/OA' element={<OAPage/>}/>
        <Route path='/InterviewSlots' element={<InterviewSlotsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
