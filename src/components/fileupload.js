import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:8000/uploadfile/", formData);
    setParsedData(response.data);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {parsedData && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(parsedData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FileUpload;
