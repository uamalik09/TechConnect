import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import AdLogin from "./Components/AdminLogin";
import AdSignup from "./Components/AdminSignup";
import IetAnnouncements from "./Components/IetAnnouncement";
import IeeeAnnouncements from "./Components/IeeeAnnouncement";
import AcmAnnouncements from "./Components/AcmAnnouncement";
import IeAnnouncements from "./Components/IeAnnouncement";
import IsteAnnouncements from "./Components/IsteAnnouncement";
import GetAnnouncements from "./Components/GetAnnouncement";
import AddTalk from "./Components/AddTalks";
import TalksPage from "./Components/TalksPage";
import AdminDashboard from "./Components/AdminDashboard";
import ChoicePage from "./Components/Choice";
import StudentDashboard from "./Components/StudentDashboard";
import AdminQuestions from "./Components/AdminQuestions";
import Quiz from "./Components/quiz";
import ClubPage from "./Components/ClubPage";
import SigPage from "./Components/SigPage";
import SigDetails from "./Components/SigDetails";
import Result from "./Components/result";
import SuperAdminPanel from "./Components/SuperAdmin";
import FAQ from "./Components/FAQs";
import GetIetAnnouncements from "./Components/GetIetAn";
import GetIeeeAnnouncements from "./Components/GetIeeeAn";
import GetAcmAnnouncements from "./Components/GetAcmAn";
import GetIeAnnouncements from "./Components/GetIeAn";
import GetIsteAnnouncements from "./Components/GetIsteAn";
import AllAnnouncement from "./Components/AllAnnouncements";
import IetDashboard from "./Components/IetDashboard";
import IeeeDashboard from "./Components/IeeeDashboard";
import AcmDashboard from "./Components/AcmDashboard";
import IeDashboard from "./Components/IeDashboard";
import IsteDashboard from "./Components/IsteDashboard";
import IetTalk from "./Components/IetTalk";
import IeeeTalk from "./Components/IeeeTalk";
import AcmTalk from "./Components/AcmTalk";
import IeTalk from "./Components/IeTalk";
import IsteTalk from "./Components/IsteTalk";
import IetTalksPage from "./Components/GetIetTalk";
import IeeeTalksPage from "./Components/GetIeeeTalk";
import AcmTalksPage from "./Components/GetAcmTalk";
import IeTalksPage from "./Components/GetIeTalk";
import IsteTalksPage from "./Components/GetIsteTalk";
import AllTalks from "./Components/AllTalks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminlogin" element={<AdLogin />} />
        <Route path="/adminsignup" element={<AdSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ietannouncement" element={<IetAnnouncements/>}/>
        <Route path="/getietannouncement" element={<GetIetAnnouncements/>}/>
        <Route path="/ieeeannouncement" element={<IeeeAnnouncements/>}/>
        <Route path="/getieeeannouncement" element={<GetIeeeAnnouncements/>}/>
        <Route path="/acmannouncement" element={<AcmAnnouncements/>}/>
        <Route path="/getacmannouncement" element={<GetAcmAnnouncements/>}/>
        <Route path="/ieannouncement" element={<IeAnnouncements/>}/>
        <Route path="/getieannouncement" element={<GetIeAnnouncements/>}/>
        <Route path="/isteannouncement" element={<IsteAnnouncements/>}/>
        <Route path="/getisteannouncement" element={<GetIsteAnnouncements/>}/>
        <Route path="/getannouncement" element={<GetAnnouncements/>}/>
        <Route path="/addtalks" element={<AddTalk/>}/>
        <Route path="/gettalks" element={<TalksPage/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/ietdashboard" element={<IetDashboard/>}/>
        <Route path="/ieeedashboard" element={<IeeeDashboard/>}/>
        <Route path="/acmdashboard" element={<AcmDashboard/>}/>
        <Route path="/iedashboard" element={<IeDashboard/>}/>
        <Route path="/istedashboard" element={<IsteDashboard/>}/>
        <Route path="/studentdashboard" element={<StudentDashboard/>}/>
        <Route path="/choice" element={<ChoicePage/>}/>
        <Route path="/adminquestions" element={<AdminQuestions />} />
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/clubs" element={<ClubPage/>}/>
        <Route path="/sigs/:clubId" element={<SigPage/>}/>
        <Route path="/sig-details/:clubId/:sigId" element={<SigDetails/>}/>
        <Route path="/results" element={<Result />} />
        <Route path="/superadmin" element={<SuperAdminPanel />}/>
        <Route path="/faqs" element={<FAQ />}/>
        <Route path="/allannouncement" element={<AllAnnouncement />}/>
        <Route path="/addiettalk" element={<IetTalk />}/>
        <Route path="/getiettalk" element={<IetTalksPage />}/>
        <Route path="/addieeetalk" element={<IeeeTalk />}/>
        <Route path="/getieeetalk" element={<IeeeTalksPage />}/>
        <Route path="/addacmtalk" element={<AcmTalk />}/>
        <Route path="/getacmtalk" element={<AcmTalksPage />}/>
        <Route path="/addietalk" element={<IeTalk />}/>
        <Route path="/getietalk" element={<IeTalksPage />}/>
        <Route path="/addistetalk" element={<IsteTalk />}/>
        <Route path="/getistetalk" element={<IsteTalksPage />}/>
        <Route path="/alltalks" element={<AllTalks />}/>
      </Routes>
    </div>
  );
}

export default App;