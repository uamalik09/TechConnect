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
      { id: 1, name: 'CIPHER', description: 'Coding and Cryptography'},
      { id: 2, name: 'ROVISP', description: 'Robotics and Vision' },
      { id: 3, name: 'TORSION', description: 'Mechanical Engineering'},
      { id: 4, name: 'VENTURE', description: 'Entrepreneurship'},
      { id: 5, name: 'INKHEART', description: 'Creative Writing' },
      { id: 6, name: 'MEDIA', description: 'Digital Media and Content Creation'},
    ],
    2: [
      { id: 1, name: 'COMPSOC', description: 'Communications Society'},
      { id: 2, name: 'DIODE', description: 'Electronics and Circuit Design' },
      { id: 3, name: 'PISTON', description: 'Automotive Engineering'},
    ],
    3: [
      { id: 1, name: 'SANGANITRA', description: 'Computing and Algorithm' },
      { id: 2, name: 'YANTRIKA', description: 'Mechanical Systems'},
      { id: 3, name: 'VIDYUT', description: 'Electrical Engineering' },
      { id: 4, name: 'KAARYAVARTA', description: 'Management' },
      { id: 5, name: 'SAAHITYA', description: 'Literature'},
      { id: 6, name: 'ABHIVYAKTA', description: 'Expression and Performing Arts' },
    ],
    4: [
      { id: 1, name: 'CATALYST', description: 'Chemical Engineering' },
      { id: 2, name: 'CHARGE', description: 'Energy Systems'},
      { id: 3, name: 'CHRONICLE', description: 'Technical Writing'},
      { id: 4, name: 'CLUTCH', description: 'Automotive Systems' },
      { id: 5, name: 'CONCRETE', description: 'Civil Engineering' },
      { id: 6, name: 'CREDIT', description: 'Finance and Economics'},
      { id: 7, name: 'CRYPT', description: 'Cybersecurity'},
      { id: 8, name: 'CREATE', description: 'Design and Innovation' },
    ],
    5: [
      { id: 1, name: 'CAPITAL', description: 'Finance and Investment'},
      { id: 2, name: 'CODE', description: 'Programming'},
      { id: 3, name: 'GADGET', description: 'Consumer Electronics'},
      { id: 4, name: 'GARAGE', description: 'Automotive Workshop'},
      { id: 5, name: 'ROBOTICS', description: 'Robotics and Automation' },
      { id: 6, name: 'SCRIPT', description: 'Programming Languages'},
      { id: 7, name: 'TECTONIC', description: 'Civil and Structural Engineering'},
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600 after:rounded-full">Student Registration</h2>
        
        {submitMessage && (
          <div className={`p-4 mb-6 rounded-lg text-center text-sm font-medium ${submitMessage.includes('successful') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
            {submitMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.rollNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'}`}
              placeholder="Enter your roll number"
            />
            {errors.rollNumber && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.rollNumber}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'}`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-400'}`}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phoneNumber && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.phoneNumber}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Clubs (Multiple Selection Allowed)</label>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {clubs.map(club => (
                <div key={club.id} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 rounded-md transition-colors duration-200">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`club-${club.id}`}
                      value={club.id.toString()}
                      checked={formData.selectedClubs.includes(club.id.toString())}
                      onChange={handleClubChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor={`club-${club.id}`} className="ml-2 block text-sm font-medium text-gray-800 cursor-pointer">
                      {club.name} - {club.description}
                    </label>
                  </div>
                  {formData.selectedClubs.includes(club.id.toString()) && (
                    <div className="ml-7 mt-3 animate-fadeIn">
                      <p className="text-sm font-medium text-gray-700 mb-2">Select SIGs for {club.name}:</p>
                      <div className="space-y-2 bg-white p-3 rounded-lg border border-gray-200 max-h-48 overflow-y-auto shadow-sm">
                        {(clubSigs[club.id] || []).map(sig => (
                          <div key={sig.id} className="flex items-center p-2 hover:bg-blue-50 rounded-md transition-colors duration-200">
                            <input
                              type="checkbox"
                              id={`sig-${club.id}-${sig.id}`}
                              value={sig.id.toString()}
                              checked={(formData.selectedSigs[club.id] || []).includes(sig.id.toString())}
                              onChange={(e) => handleSigChange(club.id.toString(), sig.id.toString(), e.target.checked)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor={`sig-${club.id}-${sig.id}`} className="ml-2 block text-sm cursor-pointer">
                              <span className="font-medium text-gray-800">{sig.name}</span> - {sig.description}
                              <div className="text-xs text-gray-500 mt-1 font-medium">Test Time: {sig.testTime}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {errors.selectedClubs && <p className="mt-2 text-sm text-red-600 font-medium">{errors.selectedClubs}</p>}
            {errors.selectedSigs && <p className="mt-2 text-sm text-red-600 font-medium">{errors.selectedSigs}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          
         {/* <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already registered? <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login here</a>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};
export default StudentRegistration;