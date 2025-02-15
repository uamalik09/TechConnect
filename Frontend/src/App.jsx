import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import AdLogin from "./Components/AdminLogin";
import AdSignup from "./Components/AdminSignup";
import AddAnnouncement from "./Components/AddAnnouncement";
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
        <Route path="/addannouncement" element={<AddAnnouncement/>}/>
        <Route path="/getannouncement" element={<GetAnnouncements/>}/>
        <Route path="/addtalks" element={<AddTalk/>}/>
        <Route path="/gettalks" element={<TalksPage/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/studentdashboard" element={<StudentDashboard/>}/>
        <Route path="/choice" element={<ChoicePage/>}/>
        <Route path="/adminquestions" element={<AdminQuestions />} />
        <Route path="/quiz" element={<Quiz />} /> 
        <Route path="/clubs" element={<ClubPage/>}/>
        <Route path="/sigs/:clubId" element={<SigPage/>}/>
        <Route path="/sig-details/:clubId/:sigId" element={<SigDetails/>}/>
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;