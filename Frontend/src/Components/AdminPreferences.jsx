import React, { useEffect, useState } from "react";
import axios from "axios";

const PreferencesAdmin = () => {
  const [preferences, setPreferences] = useState([]);
  const [allPreferences, setAllPreferences] = useState([]); // Store all preferences
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  
  // Fetch all preferences from backend
  const fetchPreferences = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/preferences/all");
      setPreferences(response.data);
      setAllPreferences(response.data); // Store complete data for filtering
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };
  
  useEffect(() => {
    fetchPreferences();
  }, []);
  
  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter preferences based on search term
    if (term.trim() === "") {
      setPreferences(allPreferences); // Show all if search is empty
    } else {
      const filtered = allPreferences.filter(student => 
        student.name.toLowerCase().includes(term)
      );
      setPreferences(filtered);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Student Preferences</h1>
      
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by student name..."
          className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {/* Results count */}
      <p className="mb-4">Showing {preferences.length} of {allPreferences.length} students</p>
      
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3">Roll No</th>
            <th className="p-3">Name</th>
            <th className="p-3">Preferences (Order)</th>
          </tr>
        </thead>
        <tbody>
          {preferences.length > 0 ? (
            preferences.map((student, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{student.rollNo}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">
                  {Object.entries(student.preferences).map(([club, rank]) => (
                    <p key={club}>
                      {club}: {rank}
                    </p>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-3 text-center">No students found matching the search criteria</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreferencesAdmin;