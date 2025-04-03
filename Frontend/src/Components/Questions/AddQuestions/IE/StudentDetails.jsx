import React, { useState, useEffect } from 'react';
import {useParams,useNavigate} from "react-router-dom";
const getUserData = () => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) {
      throw new Error("No user data found");
    }
    
    const parsedData = JSON.parse(userData);
    if (!parsedData.token) {
      throw new Error("No valid token found");
    }
    
    return parsedData;
  } catch (error) {
    console.error("Error retrieving user data:", error.message);
    return null;
  }
};
const AdminDashboard = () => {
  const navigate=useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const {sig}=useParams();
  const userData=getUserData();
  useEffect(() => {
    if (!userData.token) {
      console.error("No token found, redirecting to login.");
      navigate("/home");
      return;
    }
    if (userData.role) {
      setUserRole(userData.role);
      if (userData.role !== "ie") {
        console.error("Unauthorized role, redirecting.");
        navigate("/home");
    }
    }
  }, [userData.role, navigate]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            console.log("Token payload:", tokenData);
          } catch (e) {
            console.error("Invalid token format");
          }
        const response = await fetch(`https://tech--connect.azurewebsites.net/students/ie/${sig}/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }

        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-xl font-semibold text-gray-200">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-xl font-semibold text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Admin Dashboard</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100">Registered Students</h2>
            <p className="text-gray-400">Total: {students.length} students</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone Number</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.id || index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{student.rollNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{student.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{student.phoneNumber}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-400">
                      No students registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;