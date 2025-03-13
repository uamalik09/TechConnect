import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phoneNumber: '',
    selectedClubs: [], 
    selectedSigs: {} 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();
  const clubs = [
    { id: 1, name: 'IET', description: 'Institute of Engineering and Technology' },
    { id: 2, name: 'IEEE', description: 'Institute of Electrical and Electronics Engineers' },
    { id: 3, name: 'ACM', description: 'Association for Computing Machinery' },
    { id: 4, name: 'ISTE', description: 'Indian Society for Technical Education' },
    { id: 5, name: 'IE', description: 'Institution of Engineers' }
  ];
  
  // SIGs for each club
  const clubSigs = {
    1: [
      { id: 1, name: 'CIPHER', description: 'Coding and Cryptography', testTime: '2025-01-30 11:00 AM' },
      { id: 2, name: 'ROVISP', description: 'Robotics and Vision', testTime: '2025-01-31 03:00 PM' },
      { id: 3, name: 'TORSION', description: 'Mechanical Engineering', testTime: '2025-01-31 03:00 PM' },
      { id: 4, name: 'VENTURE', description: 'Entrepreneurship', testTime: '2025-01-31 03:00 PM' },
      { id: 5, name: 'INKHEART', description: 'Creative Writing', testTime: '2025-01-31 03:00 PM' },
      { id: 6, name: 'MEDIA', description: 'Digital Media and Content Creation', testTime: '2025-01-31 03:00 PM' },
    ],
    2: [
      { id: 1, name: 'COMSOC', description: 'Communications Society', testTime: '2025-01-28 10:00 AM' },
      { id: 2, name: 'DIODE', description: 'Electronics and Circuit Design', testTime: '2025-01-29 02:00 PM' },
      { id: 3, name: 'PISTON', description: 'Automotive Engineering', testTime: '2025-01-29 02:00 PM' },
    ],
    3: [
      { id: 1, name: 'SANGANITRA', description: 'Computing and Algorithm', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'YANTRIKA', description: 'Mechanical Systems', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'VIDYUT', description: 'Electrical Engineering', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'KAARYAVARTA', description: 'Management', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'SAAHITYA', description: 'Literature', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'ABHIVYAKTA', description: 'Expression and Performing Arts', testTime: '2025-02-02 12:00 PM' },
    ],
    4: [
      { id: 1, name: 'CATALYST', description: 'Chemical Engineering', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'CHARGE', description: 'Energy Systems', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'CHRONICLE', description: 'Technical Writing', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'CLUTCH', description: 'Automotive Systems', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'CONCRETE', description: 'Civil Engineering', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'CREDIT', description: 'Finance and Economics', testTime: '2025-02-02 12:00 PM' },
      { id: 7, name: 'CRYPT', description: 'Cybersecurity', testTime: '2025-02-02 12:00 PM' },
      { id: 8, name: 'CREATE', description: 'Design and Innovation', testTime: '2025-02-02 12:00 PM' },
    ],
    5: [
      { id: 1, name: 'CAPITAL', description: 'Finance and Investment', testTime: '2025-02-01 09:00 AM' },
      { id: 2, name: 'CODE', description: 'Programming', testTime: '2025-02-02 12:00 PM' },
      { id: 3, name: 'GADGET', description: 'Consumer Electronics', testTime: '2025-02-02 12:00 PM' },
      { id: 4, name: 'GARAGE', description: 'Automotive Workshop', testTime: '2025-02-02 12:00 PM' },
      { id: 5, name: 'ROBOTICS', description: 'Robotics and Automation', testTime: '2025-02-02 12:00 PM' },
      { id: 6, name: 'SCRIPT', description: 'Programming Languages', testTime: '2025-02-02 12:00 PM' },
      { id: 7, name: 'TECTONIC', description: 'Civil and Structural Engineering', testTime: '2025-02-02 12:00 PM' },
    ],
  };

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
    
    if (formData.selectedClubs.length === 0) {
      tempErrors.selectedClubs = "Please select at least one Club";
    }
    
    let hasSigs = false;
    for (const clubId of formData.selectedClubs) {
      if (formData.selectedSigs[clubId] && formData.selectedSigs[clubId].length > 0) {
        hasSigs = true;
        break;
      }
    }
    
    if (!hasSigs) {
      tempErrors.selectedSigs = "Please select at least one SIG from your selected clubs";
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
  const handleClubChange = (e) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return { 
          ...prev, 
          selectedClubs: [...prev.selectedClubs, value],
          selectedSigs: { 
            ...prev.selectedSigs, 
            [value]: prev.selectedSigs[value] || [] 
          }
        };
      } else {
        const updatedSigs = { ...prev.selectedSigs };
        delete updatedSigs[value];
        
        return { 
          ...prev, 
          selectedClubs: prev.selectedClubs.filter(club => club !== value),
          selectedSigs: updatedSigs
        };
      }
    });
  };

  const handleSigChange = (clubId, sigId, checked) => {
    setFormData(prev => {
      const updatedSigs = { ...prev.selectedSigs };
      
      if (!updatedSigs[clubId]) {
        updatedSigs[clubId] = [];
      }
      
      if (checked) {
        updatedSigs[clubId] = [...updatedSigs[clubId], sigId];
      } else {
        updatedSigs[clubId] = updatedSigs[clubId].filter(sig => sig !== sigId);
      }
      
      return { 
        ...prev, 
        selectedSigs: updatedSigs
      };
    });
  };

  const prepareRegistrationData = () => {
    const studentData = {
      name: formData.name,
      rollNumber: formData.rollNumber,
      email: formData.email,
      phoneNumber: formData.phoneNumber
    };
    
    const registrations = [];

    for (const clubId of formData.selectedClubs) {
      const club = clubs.find(c => c.id.toString() === clubId);
      const selectedSigIds = formData.selectedSigs[clubId] || [];

      if (selectedSigIds.length === 0) continue;
      
      for (const sigId of selectedSigIds) {
        const sig = clubSigs[clubId].find(s => s.id.toString() === sigId);
        
        registrations.push({
          ...studentData,
          clubId: clubId,
          clubName: club.name,
          sigId: sigId,
          sigName: sig.name,
          sigDescription: sig.description,
          testTime: sig.testTime
        });
      }
    }
    
    return {
      studentData,
      registrations,
      timestamp: new Date().toISOString()
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        const registrationData = prepareRegistrationData();
        console.log('Registration Data:', registrationData);
        const storageKey = `student_registration_${formData.rollNumber}`;
        localStorage.setItem(storageKey, JSON.stringify(registrationData));
        const registrationPromises = [];
        for (const registration of registrationData.registrations) {
          const registrationPath = `${registration.clubName.toLowerCase()}/${registration.sigName.toLowerCase()}/register`;
          const registrationPromise = fetch(`http://localhost:8080/students/${registrationPath}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration)
          });
          
          registrationPromises.push(registrationPromise);
        }
        
        const responses = await Promise.all(registrationPromises);
        
        const allSuccessful = responses.every(response => response.ok);
        
        if (!allSuccessful) {
          throw new Error('One or more registrations failed');
        }
        
        const allRegistrations = JSON.parse(localStorage.getItem('student_registrations') || '[]');
        allRegistrations.push(registrationData);
        localStorage.setItem('student_registrations', JSON.stringify(allRegistrations));
        
        console.log('All registrations saved to localStorage');
        
        setSubmitMessage('Registration successful!');
        setTimeout(() => navigate('/studentdashboard'), 2000);
      } catch (error) {
        setSubmitMessage('Registration failed. Please try again later.');
        console.error('Registration error:', error);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Clubs (Multiple Selection Allowed)</label>
            <div className="space-y-2 bg-gray-50 p-3 rounded-md">
              {clubs.map(club => (
                <div key={club.id} className="mb-4 border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`club-${club.id}`}
                      value={club.id.toString()}
                      checked={formData.selectedClubs.includes(club.id.toString())}
                      onChange={handleClubChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`club-${club.id}`} className="ml-2 block text-sm font-medium text-gray-700">
                      {club.name} - {club.description}
                    </label>
                  </div>
                  {formData.selectedClubs.includes(club.id.toString()) && (
                    <div className="ml-6 mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Select SIGs for {club.name}:</p>
                      <div className="space-y-1 bg-white p-2 rounded-md max-h-48 overflow-y-auto">
                        {(clubSigs[club.id] || []).map(sig => (
                          <div key={sig.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`sig-${club.id}-${sig.id}`}
                              value={sig.id.toString()}
                              checked={(formData.selectedSigs[club.id] || []).includes(sig.id.toString())}
                              onChange={(e) => handleSigChange(club.id.toString(), sig.id.toString(), e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`sig-${club.id}-${sig.id}`} className="ml-2 block text-sm text-gray-700">
                              <span className="font-medium">{sig.name}</span> - {sig.description}
                              <div className="text-xs text-gray-500">Test Time: {sig.testTime}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.selectedClubs && <p className="mt-1 text-sm text-red-600">{errors.selectedClubs}</p>}
            {errors.selectedSigs && <p className="mt-1 text-sm text-red-600">{errors.selectedSigs}</p>}
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