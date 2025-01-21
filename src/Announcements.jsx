import React, { useState } from 'react';
import './Announcement.css'

const AnnouncementSlot=()=>{
    const [announcements,setAnnouncements]=useState([]);
    const[newAnnouncement,setNewAnnouncement]=useState("");

    const handleAddAnnouncement=()=>{
        if(newAnnouncement.trim()){
            setAnnouncements([...announcements,newAnnouncement.trim()]);
            setNewAnnouncement("");
        }
    };
    return(
        <div className='announcements-section'>
            <h1>Announcements</h1>
            <div className='add-announcement'>
                <input type='text' value={newAnnouncement} onChange={(e)=>setNewAnnouncement(e.target.value)}
                placeholder="Enter an announcement"/>
                <button onClick={handleAddAnnouncement}>Add Announcement</button>
            </div>
            <div className="announcements-list">
        {announcements.length > 0 ? (
          <ul>
            {announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements added yet.</p>
        )}
      </div>
        </div>
    );
};

export default AnnouncementSlot;