import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPreferenceForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
  });
  
  const [preferences, setPreferences] = useState({
    preference1: '',
    preference2: '',
    preference3: '',
    preference4: '',
    preference5: ''
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

  useEffect(() => {
    // Retrieve student data from localStorage
    const retrieveStudentData = () => {
      const rollNumber = localStorage.getItem('current_student_roll');
      
      if (!rollNumber) {
        // If no roll number, try to find the most recent registration
        const allRegistrations = JSON.parse(localStorage.getItem('student_registrations') || '[]');
        if (allRegistrations.length > 0) {
          const latestRegistration = allRegistrations[allRegistrations.length - 1];
          setStudentData({
            name: latestRegistration.studentData.name,
            rollNumber: latestRegistration.studentData.rollNumber,
          });
          return;
        }
      } else {
        // If roll number exists, find that specific registration
        const storageKey = `student_registration_${rollNumber}`;
        const registrationData = JSON.parse(localStorage.getItem(storageKey));
        
        if (registrationData) {
          setStudentData({
            name: registrationData.studentData.name,
            rollNumber: registrationData.studentData.rollNumber,
          });
          return;
        }
      }
      
      // If no data found, redirect to registration
      alert('No registration data found. Please register first.');
      navigate('/registration');
    };

    retrieveStudentData();
  }, [navigate]);

  const validate = () => {
    let tempErrors = {};
    const selectedClubs = new Set([
      preferences.preference1, 
      preferences.preference2, 
      preferences.preference3, 
      preferences.preference4, 
      preferences.preference5
    ].filter(Boolean));
    
    // Check if all preferences are filled
    if (!preferences.preference1) tempErrors.preference1 = "First preference is required";
    if (!preferences.preference2) tempErrors.preference2 = "Second preference is required";
    if (!preferences.preference3) tempErrors.preference3 = "Third preference is required";
    if (!preferences.preference4) tempErrors.preference4 = "Fourth preference is required";
    if (!preferences.preference5) tempErrors.preference5 = "Fifth preference is required";
    
    // Check for duplicate preferences
    if (selectedClubs.size !== 5) {
      tempErrors.duplicate = "All preferences must be different";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        // Prepare data for submission
        const preferenceData = {
          studentInfo: studentData,
          preferences: [
            preferences.preference1,
            preferences.preference2,
            preferences.preference3,
            preferences.preference4,
            preferences.preference5
          ],
          submittedAt: new Date().toISOString()
        };
        
        console.log('Preference Data:', preferenceData);
        
        // Save to localStorage for demo purposes
        const storageKey = `student_preferences_${studentData.rollNumber}`;
        localStorage.setItem(storageKey, JSON.stringify(preferenceData));
        
        // Add to all preferences collection
        const allPreferences = JSON.parse(localStorage.getItem('all_student_preferences') || '[]');
        allPreferences.push(preferenceData);
        localStorage.setItem('all_student_preferences', JSON.stringify(allPreferences));
        
        // In a real application, you would send this data to the server
        const response = await fetch('http://localhost:8080/students/preferences/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(preferenceData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit preferences');
        }
        
        setSubmitMessage('Preferences submitted successfully!');
        setTimeout(() => navigate('/studentdashboard'), 2000);
      } catch (error) {
        setSubmitMessage('Preference submission failed. Please try again later.');
        console.error('Preference submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Club Preferences</h2>
        
        {submitMessage && (
          <div className={`p-3 mb-4 rounded-md ${submitMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 mb-6 rounded-md">
          <h3 className="font-semibold text-gray-700 mb-2">Student Information</h3>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {studentData.name}</p>
          <p className="text-gray-700"><span className="font-medium">Roll Number:</span> {studentData.rollNumber}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-3">
              Rank your preferences from 1 to 5 (1 being highest priority)
            </p>
            
            {errors.duplicate && (
              <p className="mb-2 text-sm text-red-600 font-medium">{errors.duplicate}</p>
            )}
            
            {[1, 2, 3, 4, 5].map((prefNum) => (
              <div key={prefNum} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preference {prefNum}
                </label>
                <select
                  name={`preference${prefNum}`}
                  value={preferences[`preference${prefNum}`]}
                  onChange={handlePreferenceChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors[`preference${prefNum}`] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a club</option>
                  {clubs.map(club => (
                    <option key={club.id} value={club.name}>
                      {club.name} - {club.description}
                    </option>
                  ))}
                </select>
                {errors[`preference${prefNum}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`preference${prefNum}`]}</p>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Preferences'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentPreferenceForm;