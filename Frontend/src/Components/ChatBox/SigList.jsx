import React from 'react';
import { Link, useParams } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Special Interest Groups (SIGs)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {selectedSigs.map((sig) => (
          <div
            key={sig.id}
            className="bg-white shadow-xl rounded-xl p-6 text-center transform transition duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold text-gray-900">{sig.name}</h3>
            <Link to={`/${clubId}/${sig.id}/chat`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SigPage;