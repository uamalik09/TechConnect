import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 


function SigDetails() {
  const { clubId, sigId } = useParams();  // Get clubId and sigId from the URL
  const navigate = useNavigate();  // Use the navigate hook to programmatically navigate

  console.log("Club ID:", clubId);
  console.log("SIG ID:", sigId);

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
      { id: 1, name: 'COMSOC', description: 'Instructions' },
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

  console.log("Selected SIG:", selectedSig);

  if (!selectedSig) {
    return <p className="text-center text-red-500">SIG Not Found</p>;
  }

  // Handle the start of the test
  const handleStartTest = () => {
    navigate('/quiz');  // Navigate to the quiz page when "Start" button is clicked
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">{selectedSig.name}</h2>
      <p className="text-lg text-gray-700 mb-6">{selectedSig.description}</p>
      <div className="flex justify-center">
        <button 
          onClick={handleStartTest} 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

export default SigDetails;
