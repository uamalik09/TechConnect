import { Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Talk from "./Components/pre-recruitment-talk"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/talk" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/talk" element={<Talk />} />
      </Routes>
    </div>
  );
}

export default App;