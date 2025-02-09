import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
function SigPage() {
  const { clubId } = useParams();  // Get club ID from URL

  // Hardcoded SIGs for each club (this could be dynamic based on the clubId)
  const sigs = {
    1: [
      { id: 1, name: 'CIPHER', description: 'Description', testTime: '2025-01-30 11:00 AM' },
      { id: 2, name: 'ROVISP', description: 'Description', testTime: '2025-01-31 03:00 PM' },
      {id: 3, name: 'TORSION', description: 'Description', testTime: '2025-01-31 03:00 PM' },
      {id: 4, name: 'VENTURE', description: 'Description', testTime: '2025-01-31 03:00 PM' },
      {id: 5, name: 'INKHEART', description: 'Description', testTime: '2025-01-31 03:00 PM' },
      {id: 6, name: 'MEDIA', description: 'Description', testTime: '2025-01-31 03:00 PM' },
    ],
    2: [
      { id: 1, name: 'COMSOC', description: 'Description', testTime: '2025-01-28 10:00 AM' },
      { id: 2, name: 'DIODE', description: 'Description', testTime: '2025-01-29 02:00 PM' },
      { id: 3, name: 'PISTON', description: 'Description', testTime: '2025-01-29 02:00 PM' },
    ],
    3: [
      { id: 1, name: 'SANGANITRA', description: 'Description', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'YANTRIKA', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'VIDYUT', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'KAARYAVARTA', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'SAAHITYA', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'ABHIVYAKTA', description: 'Description', testTime: '2025-02-02 12:00 PM' },
    ],
    4: [
      { id: 1, name: 'CATALYST', description: 'Description', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'CHARGE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'CHRONICLE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'CLUTCH', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'CONCRETE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'CREDIT', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 7, name: 'CRYPT', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 8, name: 'CREATE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
    ],
    5: [
      { id: 1, name: 'CAPITAL', description: 'Description', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'CODE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'GADGET', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'GARAGE', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'ROBOTICS', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'SCRIPT', description: 'Description', testTime: '2025-02-02 12:00 PM' },
      { id: 7, name: 'TECTONIC', description: 'Description', testTime: '2025-02-02 12:00 PM' },
    ],
  };

  const selectedSigs = sigs[clubId] || [];

  return (
    <div>
      <h2>Special Interest Groups (SIGs)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedSigs.map((sig) => (
          <div
            key={sig.id}
            style={{
              border: '1px solid #ddd',
              margin: '10px',
              padding: '20px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <h3>{sig.name}</h3>
            <p>{sig.description}</p>
            <p>Test Time: {sig.testTime}</p>
            <Link to={`/sig-details/${clubId}/${sig.id}`}>
              <button>Get Started</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SigPage;
