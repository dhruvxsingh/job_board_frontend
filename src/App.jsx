import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterLogin from "./components/RecruiterLogin";
import CandidateLogin from "./components/CandidateLogin";
import RecruiterDashboard from "./components/RecruiterDashboard";
import CandidateDashboard from "./components/CandidateDashboard";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recruiter-login" element={<RecruiterLogin />} />
      <Route path="/candidate-login" element={<CandidateLogin />} />
      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
