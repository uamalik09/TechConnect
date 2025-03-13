// AdminPage.js
import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/links/add', { title, url });
      alert('Link added successfully!');
      setTitle('');
      setUrl('');
    } catch (err) {
      alert('Error adding link');
    }
  };

  return (
    <div>
      <h2>Add Link for Students</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>URL:</label>
          <input 
            type="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Link</button>
      </form>
    </div>
  );
}

