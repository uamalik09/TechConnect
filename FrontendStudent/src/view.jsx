import React, { useState, useEffect } from "react";

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  
  const fetchAnnouncements = () => {
    fetch("http://localhost:5100/view-announcements")
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
        console.log("Fetched announcements:", data); // Debugging
      })
      .catch((error) => console.error("Error fetching announcements:", error));
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        View Announcements
      </h1>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {announcements.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f8f9fa",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ color: "#343a40", marginBottom: "10px" }}>
              {item.announcement}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAnnouncements;
