import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CandidateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/candidate-dashboard");
    } else {
      alert("Please enter email and password.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="text-center p-8 bg-blue-950 bg-opacity-90 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Candidate Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full rounded" />
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">Login</button>
        </form>
      </div>
    </div>
  );
}

export default CandidateLogin;
