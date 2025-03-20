import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FrontPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: ""
  });
  const [errors, setErrors] = useState({});
  const { clubId, sigId } = useParams(); // Get clubId and sigId from URL
  const navigate = useNavigate();

  // Club names mapping
  const clubNames = {
    "1": "IET",
    "2": "IEEE",
    "3": "ACM",
    "4": "ISTE",
    "5": "IE"
  };

  // SIG data from the previous files
  const sigDetails = {
    "1": [
      { id: 1, name: "CIPHER", description: "Instructions" },
      { id: 2, name: "ROVISP", description: "Instructions" },
      { id: 3, name: "TORSION", description: "Instructions" },
      { id: 4, name: "VENTURE", description: "Instructions" },
      { id: 5, name: "INKHEART", description: "Instructions" },
      { id: 6, name: "MEDIA", description: "Instructions" },
    ],
    "2": [
      { id: 1, name: "COMPSOC", description: "Instructions" },
      { id: 2, name: "DIODE", description: "Instructions" },
      { id: 3, name: "PISTON", description: "Instructions" },
    ],
    "3": [
      { id: 1, name: "SANGANITRA", description: "Instructions" },
      { id: 2, name: "YANTRIKA", description: "Instructions" },
      { id: 3, name: "VIDYUT", description: "Instructions" },
      { id: 4, name: "KAARYAVARTA", description: "Instructions" },
      { id: 5, name: "SAAHITYA", description: "Instructions" },
      { id: 6, name: "ABHIVYAKTA", description: "Instructions" },
    ],
    "4": [
      { id: 1, name: "CATALYST", description: "Instructions" },
      { id: 2, name: "CHARGE", description: "Instructions" },
      { id: 3, name: "CHRONICLE", description: "Instructions" },
      { id: 4, name: "CLUTCH", description: "Instructions" },
      { id: 5, name: "CONCRETE", description: "Instructions" },
      { id: 6, name: "CREDIT", description: "Instructions" },
      { id: 7, name: "CRYPT", description: "Instructions" },
      { id: 8, name: "CREATE", description: "Instructions" },
    ],
    "5": [
      { id: 1, name: "CAPITAL", description: "Instructions" },
      { id: 2, name: "CODE", description: "Instructions" },
      { id: 3, name: "GADGET", description: "Instructions" },
      { id: 4, name: "GARAGE", description: "Instructions" },
      { id: 5, name: "ROBOTICS", description: "Instructions" },
      { id: 6, name: "SCRIPT", description: "Instructions" },
      { id: 7, name: "TECTONIC", description: "Instructions" },
    ],
  };

  // Find the current SIG
  const selectedSig = sigDetails[clubId]?.find(sig => sig.id === parseInt(sigId));
  const clubName = clubNames[clubId] || "Club";
  const sigName = selectedSig?.name || "SIG";

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required";
    } else if (!/^[0-9A-Za-z]+$/.test(formData.rollNumber)) {
      newErrors.rollNumber = "Roll Number should only contain alphanumeric characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.name,
        rollNumber: formData.rollNumber
      }));
      
      // Convert club name and sig name to lowercase for URL
      const clubUrlParam = clubName.split(' ')[0].toLowerCase();
      const sigUrlParam = sigName.toLowerCase();
      
      // Navigate to the quiz page using the club and sig names in URL
      navigate(`/${clubUrlParam}/${sigUrlParam}/quiz`);
    }
  };

  // Check if user already registered
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setFormData(JSON.parse(savedUserInfo));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">{clubName}</h1>
        <h2 className="text-xl font-semibold text-center mb-6">{sigName} Quiz Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your roll number"
            />
            {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Continue to Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default FrontPage;