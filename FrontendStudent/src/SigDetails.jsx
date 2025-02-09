import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './style.css';

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
    return <p>SIG Not Found</p>;
  }

  // Handle the start of the test
  const handleStartTest = () => {
    navigate('/get-question');  // Navigate to the quiz page when "Start" button is clicked
  };

  return (
    <div>
      <h2>{selectedSig.name}</h2>
      <p>{selectedSig.description}</p>
      <button onClick={handleStartTest}>Start Test</button>
    </div>
  );
}

export default SigDetails;
