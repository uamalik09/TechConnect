import React, { useState } from 'react';
import './InterviewSlots.css';

const InterviewSlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [name, setName] = useState('');
  const [timing, setTiming] = useState('');

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (name && timing) {
      setSlots([...slots, { name, timing }]);
      setName('');
      setTiming('');
    }
  };

  return (
    <div className="interview-slots-container">
      <h1>Interview Slots</h1>
      <form onSubmit={handleAddSlot}>
        <div>
          <label htmlFor="name">Candidate Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter candidate's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="timing">Timing:</label>
          <input
            type="time"
            id="timing"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Slot</button>
      </form>

      {slots.length > 0 && (
        <div className="slots-list">
          <h2>Scheduled Slots</h2>
          <ul>
            {slots.map((slot, index) => (
              <li key={index}>
                <strong>{slot.name}</strong>: {slot.timing}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewSlotsPage;
