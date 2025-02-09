import React, { useState, useEffect } from 'react';
import './TalksPage.css';
const TalksPage = () => {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    // Fetch the pre-recruitment talks from the backend
    fetch('http://localhost:5100/api/talks')
      .then((response) => response.json())
      .then((data) => setTalks(data));
  }, []);

  return (
    <div className="talks-container">
      {talks.map((talk) => (
        <div className='talks-card' key={talk.id}>
          <h3>{talk.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${new URL(talk.videoUrl).searchParams.get('v')}`}
            frameBorder="0"
            allowFullScreen
            title={talk.title}
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default TalksPage;
