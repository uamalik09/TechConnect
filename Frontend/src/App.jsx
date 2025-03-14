import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import AdLogin from "./Components/AdminLogin";
import AdSignup from "./Components/AdminSignup";
import IetAnnouncements from "./Components/Announcements/AddAnnouncement/IetAnnouncement";
import IeeeAnnouncements from "./Components/Announcements/AddAnnouncement/IeeeAnnouncement";
import AcmAnnouncements from "./Components/Announcements/AddAnnouncement/AcmAnnouncement";
import IeAnnouncements from "./Components/Announcements/AddAnnouncement/IeAnnouncement";
import IsteAnnouncements from "./Components/Announcements/AddAnnouncement/IsteAnnouncement";
import GetAnnouncements from "./Components/GetAnnouncement";
import AddTalk from "./Components/AddTalks";
import TalksPage from "./Components/TalksPage";
import AdminDashboard from "./Components/AdminDashboard";
import ChoicePage from "./Components/Choice";
import StudentDashboard from "./Components/Dashboards/StudentDashboard";
import AdminQuestions from "./Components/AdminQuestions";
import Quiz from "./Components/quiz";
import ClubPage from "./Components/ClubPage";
import SigPage from "./Components/SigPage";
import SigDetails from "./Components/SigDetails";
import Result from "./Components/result";
import SuperAdminPanel from "./Components/SuperAdmin";
import FAQ from "./Components/FAQs";
import GetIetAnnouncements from "./Components/Announcements/GetAnnouncement/GetIetAn";
import GetIeeeAnnouncements from "./Components/Announcements/GetAnnouncement/GetIeeeAn";
import GetAcmAnnouncements from "./Components/Announcements/GetAnnouncement/GetAcmAn";
import GetIeAnnouncements from "./Components/Announcements/GetAnnouncement/GetIeAn";
import GetIsteAnnouncements from "./Components/Announcements/GetAnnouncement/GetIsteAn";
import AllAnnouncement from "./Components/Announcements/AllAnnouncements";
import IetDashboard from "./Components/Dashboards/IetDashboard";
import IeeeDashboard from "./Components/Dashboards/IeeeDashboard";
import AcmDashboard from "./Components/Dashboards/AcmDashboard";
import IeDashboard from "./Components/Dashboards/IeDashboard";
import IsteDashboard from "./Components/Dashboards/IsteDashboard";
import IetTalk from "./Components/Talks/AddTalks/IetTalk";
import IeeeTalk from "./Components/Talks/AddTalks/IeeeTalk";
import AcmTalk from "./Components/Talks/AddTalks/AcmTalk";
import IeTalk from "./Components/Talks/AddTalks/IeTalk";
import IsteTalk from "./Components/Talks/AddTalks/IsteTalk";
import IetTalksPage from "./Components/Talks/GetTalks/GetIetTalk";
import IeeeTalksPage from "./Components/Talks/GetTalks/GetIeeeTalk";
import AcmTalksPage from "./Components/Talks/GetTalks/GetAcmTalk";
import IeTalksPage from "./Components/Talks/GetTalks/GetIeTalk";
import IsteTalksPage from "./Components/Talks/GetTalks/GetIsteTalk";
import AllTalks from "./Components/Talks/AllTalks";
import ProtectedRoute from "./Components/ProtectedRoute";
import RoleBasedRoute from "./Components/RoleBasedRoute";
import CipherQuestions from "./Components/Questions/AddQuestions/IET/Cipher/CipherQuestions";
import RovispQuestions from "./Components/Questions/AddQuestions/IET/Rovisp/RovispQuestions";
import TorsionQuestions from "./Components/Questions/AddQuestions/IET/Torsion/TorsionQuestions";
import MediaQuestions from "./Components/Questions/AddQuestions/IET/Media/MediaQuestions";
import InkheartQuestions from "./Components/Questions/AddQuestions/IET/Inkheart/InkheartQuestions";
import VentureQuestions from "./Components/Questions/AddQuestions/IET/Venture/VentureQuestions";
import CompsocQuestions from "./Components/Questions/AddQuestions/IEEE/Compsoc/CompsocQuestions";
import DiodeQuestions from "./Components/Questions/AddQuestions/IEEE/Diode/DiodeQuestions";
import PistonQuestions from "./Components/Questions/AddQuestions/IEEE/Piston/PistonQuestions";
import CipherResults from "./Components/Questions/AddQuestions/IET/Cipher/Submissions";
import RovispResults from "./Components/Questions/AddQuestions/IET/Rovisp/Submissions";
import TorsionResults from "./Components/Questions/AddQuestions/IET/Torsion/Submissions";
import MediaResults from "./Components/Questions/AddQuestions/IET/Media/Submissions";
import InkheartResults from "./Components/Questions/AddQuestions/IET/Inkheart/Submissions";
import VentureResults from "./Components/Questions/AddQuestions/IET/Venture/Submissions";
import CompsocResults from "./Components/Questions/AddQuestions/IEEE/Compsoc/Submissions";
import DiodeResults from "./Components/Questions/AddQuestions/IEEE/Diode/Submissions";
import PistonResults from "./Components/Questions/AddQuestions/IEEE/Piston/Submissions";
import Register from "./Components/StudentRegister";
import CipherDetails from "./Components/Questions/AddQuestions/IET/Cipher/StudentDetails";
import RovispDetails from "./Components/Questions/AddQuestions/IET//Rovisp/StudentDetails";
import TorsionDetails from "./Components/Questions/AddQuestions/IET/Torsion/StudentDetails";
import MediaDetails from "./Components/Questions/AddQuestions/IET/Media/StudentDetails";
import VentureDetails from "./Components/Questions/AddQuestions/IET/Venture/StudentDetails";
import InkheartDetails from "./Components/Questions/AddQuestions/IET/Inkheart/StudentDetails";
import CompsocDetails from "./Components/Questions/AddQuestions/IEEE/Compsoc/StudentDetails";
import DiodeDetails from "./Components/Questions/AddQuestions/IEEE/Diode/StudentDetails";
import PistonDetails from "./Components/Questions/AddQuestions/IEEE/Piston/StudentDetails";
import CipherStatus from "./Components/Questions/AddQuestions/IET/Cipher/QuizStatus";
import RovispStatus from "./Components/Questions/AddQuestions/IET//Rovisp/QuizStatus";
import TorsionStatus from "./Components/Questions/AddQuestions/IET/Torsion/QuizStatus";
import MediaStatus from "./Components/Questions/AddQuestions/IET/Media/QuizStatus";
import VentureStatus from "./Components/Questions/AddQuestions/IET/Venture/QuizStatus";
import InkheartStatus from "./Components/Questions/AddQuestions/IET/Inkheart/QuizStatus";
import CompsocStatus from "./Components/Questions/AddQuestions/IEEE/Compsoc/QuizStatus";
import DiodeStatus from "./Components/Questions/AddQuestions/IEEE/Diode/QuizStatus";
import PistonStatus from "./Components/Questions/AddQuestions/IEEE/Piston/QuizStatus";
import FrontPage from "./Components/FrontPage";
import IetSig from "./Components/Questions/AddQuestions/IET/sigs";
import IeeeSig from "./Components/Questions/AddQuestions/IEEE/sigs";
import IetSigresults from "./Components/Questions/AddQuestions/IET/sigsforresults";
import IeeeSigresults from "./Components/Questions/AddQuestions/IEEE/sigsforresults";
import IetSigdetails from "./Components/Questions/AddQuestions/IET/sigsforregistrationdetails";
import IeeeSigdetails from "./Components/Questions/AddQuestions/IEEE/sigsforregistrationdetails";
import IetSigsstatus from "./Components/Questions/AddQuestions/IET/SigsforStatus";
import IeeeSigsstatus from "./Components/Questions/AddQuestions/IEEE/SigsforStatus";
import ClubStatus from "./Components/clubforStatus";
import ClubList from "./Components/ChatBox/ClubList";
import SigList from "./Components/ChatBox/SigList";
import Chat from "./Components/chat";
import IetSigs from "./Components/ChatBox/Ietsigs";
import Cipherchat from "./Components/ChatBox/Iet/Cipherchat";
// import Rovispchat from "./Components/ChatBox/Iet/Rovispchat";
// import IeeeQuestions from "./Components/Questions/AddQuestions/IeeeQuestions";
// import AcmQuestions from "./Components/Questions/AddQuestions/AcmQuestions";
// import IeQuestions from "./Components/Questions/AddQuestions/IeQuestions";
// import IsteQuestions from "./Components/Questions/AddQuestions/IsteQuestions";

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
        <Route path="/:club/:sig/quiz" element={<Quiz />} /> 
        <Route path="/clubs" element={<ClubPage/>}/>
        <Route path="/sigs/:clubId" element={<SigPage/>}/>
        <Route path="/sig-details/:clubId/:sigId" element={<SigDetails/>}/>
        <Route path="/:club/:sig/results" element={<Result />} />
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
        <Route path="/addcipherquestions" element={<CipherQuestions />}/>
        <Route path="/addrovispquestions" element={<RovispQuestions />}/>
        <Route path="/addtorsionquestions" element={<TorsionQuestions />}/>
        <Route path="/addmediaquestions" element={<MediaQuestions />}/>
        <Route path="/addinkheartquestions" element={<InkheartQuestions />}/>
        <Route path="/addventurequestions" element={<VentureQuestions />}/>
        <Route path="/getcipherresults" element={<CipherResults />}/>
        <Route path="/getrovispresults" element={<RovispResults />}/>
        <Route path="/gettorsionresults" element={<TorsionResults />}/>
        <Route path="/getmediaresults" element={<MediaResults />}/>
        <Route path="/getinkheartresults" element={<InkheartResults />}/>
        <Route path="/getventureresults" element={<VentureResults />}/>
        <Route path="/registration" element={<Register />}/>
        <Route path="/getcipherdetails" element={<CipherDetails />}/>
        <Route path="/getrovispdetails" element={<RovispDetails />}/>
        <Route path="/gettorsiondetails" element={<TorsionDetails />}/>
        <Route path="/getinkheartdetails" element={<InkheartDetails />}/>
        <Route path="/getmediadetails" element={<MediaDetails />}/>
        <Route path="/getventuredetails" element={<VentureDetails />}/>
        <Route path="/getcipherstatus" element={<CipherStatus />}/>
        <Route path="/getrovispstatus" element={<RovispStatus />}/>
        <Route path="/gettorsionstatus" element={<TorsionStatus />}/>
        <Route path="/getinkheartstatus" element={<InkheartStatus />}/>
        <Route path="/getmediastatus" element={<MediaStatus />}/>
        <Route path="/getventurestatus" element={<VentureStatus />}/>
        <Route path="/:clubId/:sigId/frontpage" element={<FrontPage />}/>
        <Route path="/iet" element={<IetSig />}/>
        <Route path="/ietresults" element={<IetSigresults />}/>
        <Route path="/ietdetails" element={<IetSigdetails />}/>
        <Route path="/ietstatus" element={<IetSigsstatus />}/>
        <Route path="/addcompsocquestions" element={<CompsocQuestions />}/>
        <Route path="/adddiodequestions" element={<DiodeQuestions />}/>
        <Route path="/addpistonquestions" element={<PistonQuestions />}/>
        <Route path="/getcompsocresults" element={<CompsocResults />}/>
        <Route path="/getdioderesults" element={<DiodeResults />}/>
        <Route path="/getpistonresults" element={<PistonResults />}/>
        <Route path="/getcompsocdetails" element={<CompsocDetails />}/>
        <Route path="/getdiodedetails" element={<DiodeDetails />}/>
        <Route path="/getpistondetails" element={<PistonDetails />}/>
        <Route path="/getcompsocstatus" element={<CompsocStatus />}/>
        <Route path="/getdiodestatus" element={<DiodeStatus />}/>
        <Route path="/getpistonstatus" element={<PistonStatus />}/>
        <Route path="/ieee" element={<IeeeSig />}/>
        <Route path="/ieeeresults" element={<IeeeSigresults />}/>
        <Route path="/ieeedetails" element={<IeeeSigdetails />}/>
        <Route path="/ieeestatus" element={<IeeeSigsstatus />}/>
        <Route path="/clubstatus" element={<ClubStatus />}/>
        <Route path="/club" element={<ClubList/>}/>
        <Route path="/sig/:clubId" element={<SigList/>}/>
        <Route path="/:clubId/:sigId/chat" element={<Chat />} />
        <Route path="/ietsigs" element={<IetSigs />}/>
        <Route path="/Cipherchat" element={<Cipherchat/>}/>
        {/* <Route path="/addieeequestions" element={<IeeeQuestions />}/> */}
        {/* <Route path="/addacmquestions" element={<AcmQuestions />}/> */}
        {/* <Route path="/addiequestions" element={<IeQuestions />}/> */}
        {/* <Route path="/addistequestions" element={<IsteQuestions />}/> */}
      </Routes>
    </div>
  );
}

export default App;