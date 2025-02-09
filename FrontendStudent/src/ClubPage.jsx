import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
function ClubPage() {
  const clubs = [
    { id: 1, name: 'IET', description: 'Institute of Engineering and Technology' },
    { id: 2, name: 'IEEE', description: 'Institute of Electrical and Electronics Engineers' },
    { id: 3, name: 'ACM', description: 'Association for Computing Machinery' },
    { id: 4, name: 'ISTE', description: 'Indian Society for Technical Education'},
    { id: 5, name: 'IE', description: 'Institution of Engineers'}
  ];

  return (
    <div>
      <h2>Clubs</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {clubs.map((club) => (
          <div
            key={club.id}
            style={{
              border: '1px solid #ddd',
              margin: '10px',
              padding: '20px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <Link to={`/sigs/${club.id}`}>
              <button>Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubPage;
