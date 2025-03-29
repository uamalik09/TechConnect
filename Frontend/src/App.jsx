import { Routes, Route, Navigate,Router } from "react-router-dom";
import './index.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import IetAnnouncements from "./Components/Announcements/AddAnnouncement/IetAnnouncement";
import IeeeAnnouncements from "./Components/Announcements/AddAnnouncement/IeeeAnnouncement";
import AcmAnnouncements from "./Components/Announcements/AddAnnouncement/AcmAnnouncement";
import IeAnnouncements from "./Components/Announcements/AddAnnouncement/IeAnnouncement";
import IsteAnnouncements from "./Components/Announcements/AddAnnouncement/IsteAnnouncement";
import GetAnnouncements from "./Components/GetAnnouncement";
import GetStuAnnouncement from "./Components/Announcements/Announ";
import AddTalk from "./Components/AddTalks";
import TalksPage from "./Components/TalksPage";
import AdminDashboard from "./Components/AdminDashboard";
import ChoicePage from "./Components/Choice";
import StudentDashboard from "./Components/Dashboards/StudentDashboard";
import Quiz from "./Components/quiz";
import ClubPage from "./Components/ClubPage";
import SigPage from "./Components/SigPage";
import SigDetails from "./Components/SigDetails";
import Result from "./Components/result";
import SuperAdminPanel from "./Components/SuperAdmin";
import FAQ from "./Components/FAQs";
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
import Register from "./Components/StudentRegister";
import IetSig from "./Components/Questions/AddQuestions/IET/sigs";
import IetSigresults from "./Components/Questions/AddQuestions/IET/sigsforresults";
import IetSigdetails from "./Components/Questions/AddQuestions/IET/sigsforregistrationdetails";
import IetSigsstatus from "./Components/Questions/AddQuestions/IET/SigsforStatus";
import IeeeSig from "./Components/Questions/AddQuestions/IEEE/sigs";
import IeeeSigresults from "./Components/Questions/AddQuestions/IEEE/sigsforresults";
import IeeeSigdetails from "./Components/Questions/AddQuestions/IEEE/sigsforregistrationdetails";
import IeeeSigsstatus from "./Components/Questions/AddQuestions/IEEE/SigsforStatus";
import AcmSig from "./Components/Questions/AddQuestions/ACM/sigs";
import AcmSigresults from "./Components/Questions/AddQuestions/ACM/sigsforresults";
import AcmSigdetails from "./Components/Questions/AddQuestions/ACM/sigsforregistrationdetails";
import AcmSigsstatus from "./Components/Questions/AddQuestions/ACM/SigsforStatus";
import IsteSig from "./Components/Questions/AddQuestions/ISTE/sigs";
import IsteSigresults from "./Components/Questions/AddQuestions/ISTE/sigsforresults";
import IsteSigdetails from "./Components/Questions/AddQuestions/ISTE/sigsforregistrationdetails";
import IsteSigsstatus from "./Components/Questions/AddQuestions/ISTE/SigsforStatus";
import IeSig from "./Components/Questions/AddQuestions/IE/sigs";
import IeSigresults from "./Components/Questions/AddQuestions/IE/sigsforresults";
import IeSigdetails from "./Components/Questions/AddQuestions/IE/sigsforregistrationdetails";
import IeSigsstatus from "./Components/Questions/AddQuestions/IE/SigsforStatus";
import ClubStatus from "./Components/clubforStatus";
import ClubList from "./Components/ChatBox/ClubList";
import SigList from "./Components/ChatBox/SigList";
import Chat from "./Components/chat";
import IetSigs from "./Components/ChatBox/Ietsigs";
import SigChat from "./Components/ChatBox/Iet/SigChat";
import IetCode from "./Components/CodingLink.jsx/IetCode";
import IeeeCode from "./Components/CodingLink.jsx/IeeeCode";
import AcmCode from "./Components/CodingLink.jsx/AcmCoding";
import IeCode from "./Components/CodingLink.jsx/IeCoding";
import IsteCode from "./Components/CodingLink.jsx/IsteCoding";
import AllCode from "./Components/CodingLink.jsx/AllCode";
import PreferenceForm from "./Components/PreferenceForm";
import AdminPreferences from "./Components/AdminPreferences";
import { AuthProvider } from "./Context/AuthContext"; 

import IETQuestions from "./Components/Questions/AddQuestions/IET/IETQuestions";
import IETDetails from "./Components/Questions/AddQuestions/IET/StudentDetails";
import IETStatus from "./Components/Questions/AddQuestions/IET/QuizStatus";
import IETResults from "./Components/Questions/AddQuestions/IET/Submissions";

import IEEEQuestions from "./Components/Questions/AddQuestions/IEEE/IEEEQuestions";
import IEEEDetails from "./Components/Questions/AddQuestions/IEEE/StudentDetails";
import IEEEStatus from "./Components/Questions/AddQuestions/IEEE/QuizStatus";
import IEEEResults from "./Components/Questions/AddQuestions/IEEE/Submissions";

import IEQuestions from "./Components/Questions/AddQuestions/IE/IEQuestions";
import IEDetails from "./Components/Questions/AddQuestions/IE/StudentDetails";
import IEStatus from "./Components/Questions/AddQuestions/IE/QuizStatus";
import IEResults from "./Components/Questions/AddQuestions/IE/Submissions";

import ISTEQuestions from "./Components/Questions/AddQuestions/ISTE/ISTEQuestions";
import ISTEDetails from "./Components/Questions/AddQuestions/ISTE/StudentDetails";
import ISTEStatus from "./Components/Questions/AddQuestions/ISTE/QuizStatus";
import ISTEResults from "./Components/Questions/AddQuestions/ISTE/Submissions";

import ACMQuestions from "./Components/Questions/AddQuestions/ACM/ACMQuestions";
import ACMDetails from "./Components/Questions/AddQuestions/ACM/StudentDetails";
import ACMStatus from "./Components/Questions/AddQuestions/ACM/QuizStatus";
import ACMResults from "./Components/Questions/AddQuestions/ACM/Submissions";

import GetstuAcmAnnouncements from "./Components/Announcements/StudentAnnouncement/AcmAnn";
import GetstuIeAnnouncements from "./Components/Announcements/StudentAnnouncement/IeAnn";
import GetstuIeeeAnnouncements from "./Components/Announcements/StudentAnnouncement/IeeeAnn";
import GetstuIetAnnouncements from "./Components/Announcements/StudentAnnouncement/IetAnn";
import GetstuIsteAnnouncements from "./Components/Announcements/StudentAnnouncement/IsteAnn";

import IetstuLink from "./Components/CodingLink.jsx/StudentLink/IetStuLink";
import IeeestuLink from "./Components/CodingLink.jsx/StudentLink/IeeeStuLink";
import AcmstuLink from "./Components/CodingLink.jsx/StudentLink/AcmStuLink";
import IestuLink from "./Components/CodingLink.jsx/StudentLink/IeStuLink";
import IstestuLink from "./Components/CodingLink.jsx/StudentLink/IsteStuLink";
import ClubPageStu from "./Components/CodingLink.jsx/AllStuCode";

function App() {

  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/getannouncement" element={<GetAnnouncements/>}/>
        <Route path="/getstuannouncement" element={<GetStuAnnouncement/>}/>
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
        <Route path="/clubs" element={<ClubPage/>}/>
        <Route path="/sigs/:clubId" element={<SigPage/>}/>
        <Route path="/sig-details/:clubId/:sigId" element={<SigDetails/>}/>
        <Route path="/:club/:sig/results" element={<Result />} />
        <Route path="/superadmin" element={<SuperAdminPanel />}/>
        <Route path="/faqs" element={<FAQ />}/>
        <Route path="/allannouncement" element={<AllAnnouncement />}/>
        <Route path="/alltalks" element={<AllTalks />}/>
        <Route path="/ietsigs" element={<IetSigs />}/>
        <Route path="/allcodelinks" element={<AllCode/>}/>
        <Route path="/allcodestulinks" element={<ClubPageStu/>}/>
        <Route path="/registration" element={<Register />}/>
        <Route path="/iet" element={<IetSig />}/>
        <Route path="/ietresults" element={<IetSigresults />}/>
        <Route path="/ietdetails" element={<IetSigdetails />}/>
        <Route path="/ietstatus" element={<IetSigsstatus />}/>
        <Route path="/ieee" element={<IeeeSig />}/>
        <Route path="/ieeeresults" element={<IeeeSigresults />}/>
        <Route path="/ieeedetails" element={<IeeeSigdetails />}/>
        <Route path="/ieeestatus" element={<IeeeSigsstatus />}/>
        <Route path="/acm" element={<AcmSig />}/>
        <Route path="/acmresults" element={<AcmSigresults />}/>
        <Route path="/acmdetails" element={<AcmSigdetails />}/>
        <Route path="/acmstatus" element={<AcmSigsstatus />}/>
        <Route path="/ie" element={<IeSig />}/>
        <Route path="/ieresults" element={<IeSigresults />}/>
        <Route path="/iedetails" element={<IeSigdetails />}/>
        <Route path="/iestatus" element={<IeSigsstatus />}/>
        <Route path="/iste" element={<IsteSig />}/>
        <Route path="/isteresults" element={<IsteSigresults />}/>
        <Route path="/istedetails" element={<IsteSigdetails />}/>
        <Route path="/istestatus" element={<IsteSigsstatus />}/>
        <Route path="/clubstatus" element={<ClubStatus />}/>
        <Route path="/club" element={<ClubList/>}/>
        <Route path="/sig/:clubId" element={<SigList/>}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/chat/:clubId/:sigId" element={<Chat />} />
          <Route path="/:sigId/chat" element={<SigChat/>}/>
          <Route path="/preferenceform" element={<PreferenceForm/>}/>
          <Route path="/adminpreferences" element={<AdminPreferences/>}/>
          <Route path="/:club/:sig/quiz" element={<Quiz />} />
          <Route path="/:sig/addietquestions" element={<IETQuestions />}/>
          <Route path="/:sig/getietdetails" element={<IETDetails />}/>
          <Route path="/:sig/getietresults" element={<IETResults />}/>
          <Route path="/:sig/getietstatus" element={<IETStatus />}/>
          <Route path="/:sig/addieeequestions" element={<IEEEQuestions />}/>
          <Route path="/:sig/getieeedetails" element={<IEEEDetails />}/>
          <Route path="/:sig/getieeeresults" element={<IEEEResults />}/>
          <Route path="/:sig/getieeestatus" element={<IEEEStatus />}/>
          <Route path="/:sig/addiequestions" element={<IEQuestions />}/>
          <Route path="/:sig/getiedetails" element={<IEDetails />}/>
          <Route path="/:sig/getieresults" element={<IEResults />}/>
          <Route path="/:sig/getiestatus" element={<IEStatus />}/>
          <Route path="/:sig/addistequestions" element={<ISTEQuestions />}/>
          <Route path="/:sig/getistedetails" element={<ISTEDetails />}/>
          <Route path="/:sig/getisteresults" element={<ISTEResults />}/>
          <Route path="/:sig/getistestatus" element={<ISTEStatus />}/>
          <Route path="/:sig/addacmquestions" element={<ACMQuestions />}/>
          <Route path="/:sig/getacmdetails" element={<ACMDetails />}/>
          <Route path="/:sig/getacmresults" element={<ACMResults />}/>
          <Route path="/:sig/getacmstatus" element={<ACMStatus />}/>
          <Route path="/ietannouncement" element={<IetAnnouncements/>}/>
          <Route path="/getstuietannouncement" element={<GetstuIetAnnouncements/>}/>
          <Route path="/ieeeannouncement" element={<IeeeAnnouncements/>}/>
          <Route path="/getstuieeeannouncement" element={<GetstuIeeeAnnouncements/>}/>
          <Route path="/acmannouncement" element={<AcmAnnouncements/>}/>
          <Route path="/getstuacmannouncement" element={<GetstuAcmAnnouncements/>}/>
          <Route path="/ieannouncement" element={<IeAnnouncements/>}/>
          <Route path="/getstuieannouncement" element={<GetstuIeAnnouncements/>}/>
          <Route path="/isteannouncement" element={<IsteAnnouncements/>}/>
          <Route path="/getstuisteannouncement" element={<GetstuIsteAnnouncements/>}/>
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
          <Route path="/ietcode" element={<IetCode/>}/>
          <Route path="/ietstulink" element={<IetstuLink/>}/>
          <Route path="/ieeecode" element={<IeeeCode/>}/>
          <Route path="/ieeestulink" element={<IeeestuLink/>}/>
          <Route path="/acmcode" element={<AcmCode/>}/>
          <Route path="/acmstulink" element={<AcmstuLink/>}/>
          <Route path="/iecode" element={<IeCode/>}/>
          <Route path="/iestulink" element={<IestuLink/>}/>
          <Route path="/istecode" element={<IsteCode/>}/>
          <Route path="/istestulink" element={<IstestuLink/>}/>
        </Route>
        
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;