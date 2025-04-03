import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreferencesAdmin = () => {
  const [preferences, setPreferences] = useState([]);
  const [allPreferences, setAllPreferences] = useState([]); // Store all preferences for filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Function to get admin user data securely
  const getAdminData = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("No user data found");
      }

      const parsedData = JSON.parse(userData);
      const allowedRoles = ["iet", "ieee", "iste", "ie", "acm"];
      if (!parsedData.token || !allowedRoles.includes(parsedData.role.toLowerCase())) {
        throw new Error("Unauthorized access");
      }

      return parsedData;
    } catch (error) {
      console.error("Authentication Error:", error.message);
      return null;
    }
  };

  // ✅ Fetch all preferences from backend
  const fetchPreferences = async () => {
    const adminData = getAdminData();
    if (!adminData) {
      localStorage.removeItem("user"); // Clear invalid session
      navigate("/home");
      return;
    }

    try {
      const response = await axios.get("https://tech--connect.azurewebsites.net/api/preferences/all", {
        headers: {
          Authorization: `Bearer ${adminData.token}`, // ✅ Attach token
        },
      });
      setPreferences(response.data);
      setAllPreferences(response.data); // Store complete data for filtering
    } catch (error) {
      console.error("Error fetching preferences:", error);
      setError("Failed to fetch preferences. Please try again.");
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  // ✅ Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter preferences based on search term
    if (term.trim() === "") {
      setPreferences(allPreferences); // Show all if search is empty
    } else {
      const filtered = allPreferences.filter((student) =>
        student.name.toLowerCase().includes(term) || student.rollNo.includes(term)
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