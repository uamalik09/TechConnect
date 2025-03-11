import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    if (!formData.rollNumber.trim()) {
      tempErrors.rollNumber = "Roll number is required";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.rollNumber)) {
      tempErrors.rollNumber = "Roll number should contain only letters and numbers";
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone number should be 10 digits";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        const response = await fetch('http://localhost:8080/students/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
        
        setSubmitMessage('Registration successful!');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      } catch (error) {
        setSubmitMessage(error.message === 'Student with this roll number already exists' ? 
          'A student with this roll number is already registered.' : 
          'Registration failed. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Registration</h2>
        
        {submitMessage && (
          <div className={`p-3 mb-4 rounded-md ${submitMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your roll number"
            />
            {errors.rollNumber && <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already registered? <a href="/login" className="text-blue-600 hover:text-blue-800">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;