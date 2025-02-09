import React, { useState, useEffect } from "react";
import Axios from "axios";
// import "./styles.css"; // Import CSS

const InterviewSlot = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5100/get-interview-slots")
            .then(response => setSlots(response.data))
            .catch(error => console.error("Error fetching slots:", error));
    }, []);

    return (
        <div className="container">
            <h1>Available Interview Slots</h1>
            <ul className="slot-list">
                {slots.map(slot => (
                    <li key={slot.id} className="slot-item">
                        {slot.date} {slot.time} - {slot.organizer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterviewSlot;
