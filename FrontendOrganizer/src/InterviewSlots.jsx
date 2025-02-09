import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./InterviewSlots.css"; 

const InterviewSlot = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = () => {
        Axios.get("http://localhost:5100/get-interview-slots")
            .then(response => setSlots(response.data))
            .catch(error => console.error("Error fetching slots:", error));
    };

   
    const addSlot = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5100/add-interview-slot", { date, time, organizer })
            .then(response => {
                alert(response.data.message);
                setDate(""); setTime(""); setOrganizer("");
                fetchSlots(); 
            })
            .catch(error => console.error("Error adding slot:", error));
    };
    
    const deleteSlot = (id) => {
        console.log("Deleting slot with ID:", id);
    
        Axios.delete(`http://localhost:5100/add-interview-slot/${id}`)
          .then((response) => {
            alert(response.data.message);
            fetchSlots();
          })
          .catch((error) => console.error("Error deleting slot:", error));
      };
    

    return (
        <div className="container">
            <h1>Organizer - Interview Slots</h1>
            <form onSubmit={addSlot} className="form">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <input type="text" placeholder="Organizer Name and student name" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
                <button type="submit">Add Slot</button>
            </form>

            <h2>Existing Slots</h2>
            <ul className="slot-list">
                {slots.map(slot => (
                    <li key={slot.id} className="slot-item">
                        {slot.date} {slot.time} - {slot.organizer}
                        <button className="delete-btn" onClick={() => deleteSlot(slot.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterviewSlot;
