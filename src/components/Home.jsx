import { Link } from "react-router-dom";

function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen w-full"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="text-center p-8 bg-gray-800 bg-opacity-90 rounded-xl shadow-xl mx-4 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to AI Resume Screener
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/recruiter-login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:text-blue-700 transition-colors duration-300 text-center"
          >
            Recruiter Login
          </Link>
          <Link 
            to="/candidate-login" 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:text-green-700 transition-colors duration-300 text-center"
          >
            Candidate Login
          </Link>
        </div>
      </div>
    </div>
    
  );
}


export default Home;