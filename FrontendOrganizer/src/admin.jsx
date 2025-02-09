import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import './admin.css';
 
const AddAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(""); 
  const [announcements, setAnnouncements] = useState([]); 

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    Axios.get("http://localhost:5100/view-announcements")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  };

  const addAnnouncement = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5100/add-announcement", { announcement })
      .then((response) => {
        alert(response.data.message);
        setAnnouncement(""); 
        fetchAnnouncements(); 
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);
      });
  };

  const handleDelete = (id) => {
    console.log("Attempting to delete announcement with ID:", id); // Debugging
  
    if (!id) {
      console.error("Error: Received undefined ID for deletion");
      return;
    }
  
    Axios.delete(`http://localhost:5100/add-announcement/${id}`)
      .then(() => {
        console.log("Announcement deleted successfully");
        fetchAnnouncements();
      })
      .catch((error) => {
        console.error("Error deleting announcement:", error);
      });
  };
  
  
  
  return (
    <div className="announcements-section">
      <h1>
        Add Announcement
      </h1>
      <form className="add-announcement"
        onSubmit={addAnnouncement}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <textarea
          style={{
            width: "80%",
            height: "100px",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
          placeholder="Enter your announcement"
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          required
        />
<div style={{ display: "flex", gap: "10px" }}>
  <button
    type="submit"
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Add Announcement
  </button>

  
</div>

      </form>
      <div className="announcements-list" style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                padding: "5px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAnnouncement;
