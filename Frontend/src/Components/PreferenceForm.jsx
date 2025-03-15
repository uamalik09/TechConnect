import React, { useState } from "react";

const clubs = ["IET", "IEEE", "IE", "ISTE", "ACM"];

const PreferenceForm = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [preferences, setPreferences] = useState({});

  const handlePreferenceChange = (club, value) => {
    const updatedPreferences = { ...preferences, [club]: value };

    // Prevent duplicate rankings
    const values = Object.values(updatedPreferences);
    const hasDuplicate = values.some(
      (item, index) => values.indexOf(item) !== index
    );

    if (hasDuplicate) {
      alert("You cannot assign the same preference to multiple clubs.");
    } else {
      setPreferences(updatedPreferences);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:8080/api/preferences/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rollNo,
        preferences,
      }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert("Preferences submitted successfully!");
      setName("");
      setRollNo("");
      setPreferences({});
    } else {
      alert(data.message || "Failed to submit preferences.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6">Preference Form</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        {clubs.map((club) => (
          <div key={club} className="mb-4">
            <label className="block mb-2">{club}</label>
            <select
              className="w-full p-2 bg-gray-700 rounded"
              value={preferences[club] || ""}
              onChange={(e) => handlePreferenceChange(club, e.target.value)}
            >
              <option value="">Select Preference</option>
              {Array.from({ length: clubs.length }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-500 p-2 mt-4 rounded">
          Submit Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferenceForm;