import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../config/api'; 

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Fetch jobs from backend
  useEffect(() => {
    axios.get(`${API_URL}/jobs/`)
      .then(response => setJobs(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedJob) {
      alert("Please select a job and upload a resume.");
      return;
    }
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jd", selectedJob.description);
    formData.append("job_id", selectedJob.id);

    try {
      const res = await axios.post(`${API_URL}/upload/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
        console.error("Error during upload:", err);
        alert("Failed to process. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const openModal = (description) => {
    setModalContent(description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img3.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h2 className="text-3xl font-bold mb-4 text-white">Candidate Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map(job => (
            <div key={job.id} className="border p-4 rounded shadow bg-gray-500">
              <h3 className="text-black font-bold text-lg">{job.title}</h3>
              <p className="mb-2">
                {truncateText(job.description)}
                <button 
                  onClick={() => openModal(job.description)}
                  className="bg-transparent border-none text-black hover:text-blue-700 ml-1 text-sm"
                >
                  Read more
                </button>
              </p>
              <button 
                onClick={() => setSelectedJob(job)} 
                className={`mt-2 px-4 py-2 rounded ${selectedJob?.id === job.id ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}
              >
                {selectedJob?.id === job.id ? "Selected" : "Select Job"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 bg-gray-500 p-4 rounded shadow w-full max-w-4xl">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="border p-2 w-full rounded file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700" />
        <button type="submit" disabled={loading} className={`w-full py-2 ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white rounded`}>
          {loading ? "Processing..." : "Submit Application"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-500 rounded shadow w-full max-w-4xl">
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <pre className="text-sm">{JSON.stringify(result.parsed_resume, null, 2)}</pre>
        </div>
      )}

      {/* Modal for full job description */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-500 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Job Description</h3>
              <button onClick={closeModal} className="text-gray-50 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-grow">
              <p className="whitespace-pre-line">{modalContent}</p>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;