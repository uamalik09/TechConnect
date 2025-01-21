import React, { useState } from 'react';
import './pre-recruitment-talk.css'

const PreRecruitmentTalkPage = () => {
  const [videoUrl, setVideoUrl] = useState(''); 
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false); 
  };

  
  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  return (
    <div className="pre-recruitment-talk-container">
      <h1>Pre Recruitment Talk</h1>
      {!showForm ? (
        <div>
          <p>If you'd like to add a video, click the button below:</p>
          <button onClick={() => setShowForm(true)}>Add YouTube Link</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="videoUrl">Enter YouTube Video URL:</label>
            <input
              type="url"
              id="videoUrl"
              placeholder="https://youtube.com/..."
              value={videoUrl}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {videoUrl && (
        <div className="video-container">
          <h2>Embedded Video</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]?.split('&')[0]}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PreRecruitmentTalkPage;
