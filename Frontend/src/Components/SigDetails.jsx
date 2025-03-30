import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 


function SigDetails() {
  const { clubId, sigId } = useParams();  // Get clubId and sigId from the URL
  const navigate = useNavigate();  // Use the navigate hook to programmatically navigate

  console.log("Club ID:", clubId);
  console.log("SIG ID:", sigId);
  const clubNames = {
    "1": "IET",
    "2": "IEEE",
    "3": "ACM",
    "4": "ISTE",
    "5": "IE"
  };
  // Hardcoded details for each SIG
  const sigDetails = {
    1: [
      { id: 1, name: 'CIPHER', description: 'Instructions' },
      { id: 2, name: 'ROVISP', description: 'Instructions' },
      { id: 3, name: 'TORSION', description: 'Instructions' },
      { id: 4, name: 'VENTURE', description: 'Instructions' },
      { id: 5, name: 'INKHEART', description: 'Instructions' },
      { id: 6, name: 'MEDIA', description: 'Instructions' },
    ],
    2: [
      { id: 1, name: 'COMPSOC', description: 'Instructions' },
      { id: 2, name: 'DIODE', description: 'Instructions' },
      { id: 3, name: 'PISTON', description: 'Instructions' },
    ],
    3: [
      { id: 1, name: 'SANGANITRA', description: 'Instructions' },
      { id: 2, name: 'YANTRIKA', description: 'Instructions' },
      { id: 3, name: 'VIDYUT', description: 'Instructions' },
      { id: 4, name: 'KAARYAVARTA', description: 'Instructions' },
      { id: 5, name: 'SAAHITYA', description: 'Instructions' },
      { id: 6, name: 'ABHIVYAKTA', description: 'Instructions' },
    ],
    4: [
      { id: 1, name: 'CATALYST', description: 'Instructions' },
      { id: 2, name: 'CHARGE', description: 'Instructions' },
      { id: 3, name: 'CHRONICLE', description: 'Instructions' },
      { id: 4, name: 'CLUTCH', description: 'Instructions' },
      { id: 5, name: 'CONCRETE', description: 'Instructions' },
      { id: 6, name: 'CREDIT', description: 'Instructions' },
      { id: 7, name: 'CRYPT', description: 'Instructions' },
      { id: 8, name: 'CREATE', description: 'Instructions' },
    ],
    5: [
      { id: 1, name: 'CAPITAL', description: 'Instructions' },
      { id: 2, name: 'CODE', description: 'Instructions' },
      { id: 3, name: 'GADGET', description: 'Instructions' },
      { id: 4, name: 'GARAGE', description: 'Instructions' },
      { id: 5, name: 'ROBOTICS', description: 'Instructions' },
      { id: 6, name: 'SCRIPT', description: 'Instructions' },
      { id: 7, name: 'TECTONIC', description: 'Instructions' },
    ],
  };

  // Check if the SIG exists in the data
  const selectedSig = sigDetails[clubId]?.find(sig => sig.id === parseInt(sigId));
  const clubName = clubNames[clubId];
  const sigName = selectedSig?.name;

  console.log("Selected SIG:", selectedSig);

  if (!selectedSig) {
    return <p className="text-center text-red-500">SIG Not Found</p>;
  }
  
  // Handle the start of the test
  const handleStartTest = () => {
    const clubUrlParam = clubName.split(' ')[0].toLowerCase();
  const sigUrlParam = sigName.toLowerCase();
    if (!clubName || !sigName) {
      console.error("Club Name or SIG Name is undefined.");
      return;
    }
    navigate(`/${clubUrlParam}/${sigUrlParam}/quiz`);  // Navigate to the quiz page when "Start" button is clicked
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-center mb-6">{selectedSig.name}</h2>
      
      {/* Instructions Box */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-3">Instructions:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Select the most appropriate answer for each question.</li>
          <li>Each correct answer awards points.</li>
          <li>Ensure a stable internet connection before starting.</li>
          <li>Timer will start as soon as you begin the test.</li>
          <li>You cannot start the test before the scheduled start time.</li>
        </ul>
      </div>
  
      {/* Start Test Button */}
      <button 
        onClick={handleStartTest} 
        className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Start Test
      </button>
    </div>
  );
  
}

export default SigDetails;
