import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const IetstuLink = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    const fetchLinks = async () => {
      const userData = getUserData();
    
    // Redirect to login if no valid user data
    if (!userData||userData.role!="user") {
      console.error("No authenticated user found");
      navigate("/home");
      return;
    }
    
      try {
        const token = userData.token; // Get token from local storage
        if (!token) throw new Error("Unauthorized: No token found");

        const res = await axios.get("https://tech--connect.azurewebsites.net/coding/iet/getcode/student", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        setLinks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load test links.");
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Available Tests</h1>
        </div>
        
        <div className="p-6">
          {loading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {!loading && !error && links.length === 0 && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-gray-500">No tests available at this time.</p>
            </div>
          )}
          
          {!loading && !error && links.length > 0 && (
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={link.id || index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-medium text-gray-900">Test {index + 1}</p>
                        {link.name && <p className="text-sm text-gray-500">{link.name}</p>}
                      </div>
                      <div className="ml-auto">
                        <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default IetstuLink;