import React, { useState, useEffect } from 'react';
import './OrganizerPage.css';
import { Link } from 'react-router-dom'; 
const OrganizerPage = () => {
  const [talkDetails, setTalkDetails] = useState({ title: '', videoUrl: ''});
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5100/api/talks')
      .then((response) => response.json())
      .then((data) => setTalks(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:5100/api/organizer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(talkDetails),
    });

    const response = await fetch('http://localhost:5100/api/talks');
    const data = await response.json();
    setTalks(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5100/api/organizer/${id}`, {
      method: 'DELETE',
    });

    const response = await fetch('http://localhost:5100/api/talks');
    const data = await response.json();
    setTalks(data);
  };

  return (
    <div className='container'>
      {/* Form to add a new talk */}
      <h2>Pre-Recruitment talk</h2>
      <form className="organizer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTalkDetails({ ...talkDetails, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="YouTube URL"
          onChange={(e) => setTalkDetails({ ...talkDetails, videoUrl: e.target.value })}
        />
        <button type="submit">Add Talk</button>
      </form>

      <div>
        {talks.map((talk) => (
          <div key={talk.id}>
            <h3>{talk.title}</h3>
            <iframe
              width="560"
              height="315"
              src={talk.videoUrl.includes('youtube.com') || talk.videoUrl.includes('youtu.be')
                ? `https://www.youtube.com/embed/${new URL(talk.videoUrl).searchParams.get('v')}`
                : ''}
              frameBorder="0"
              allowFullScreen
              title={talk.title}
            ></iframe>
            <button onClick={() => handleDelete(talk.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerPage;
