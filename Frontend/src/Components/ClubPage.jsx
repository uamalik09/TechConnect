import React from 'react';
import { Link } from 'react-router-dom';

function ClubPage() {
  const clubs = [
    { id: 1, name: 'IET', description: 'Institute of Engineering and Technology' },
    { id: 2, name: 'IEEE', description: 'Institute of Electrical and Electronics Engineers' },
    { id: 3, name: 'ACM', description: 'Association for Computing Machinery' },
    { id: 4, name: 'ISTE', description: 'Indian Society for Technical Education' },
    { id: 5, name: 'IE', description: 'Institution of Engineers' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Clubs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-white shadow-lg rounded-xl p-6 text-center transition duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
            <p className="text-gray-600 mt-2">{club.description}</p>
            <Link to={`/sigs/${club.id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubPage;
