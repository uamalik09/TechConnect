import React, { useState, useEffect } from 'react';

const AdminSubmissionsDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Debug token
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          console.log("Token payload:", tokenData);
        } catch (e) {
          console.error("Invalid token format");
        }
        
        const response = await fetch('http://localhost:8080/results/iet/inkheart/submissions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch submissions data');
        }

        const data = await response.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleStatusUpdate = async (submissionId, field, value) => {
    try {
      const token = localStorage.getItem('token');
      const updateData = { [field]: value };
      
      const response = await fetch(`http://localhost:8080/results/iet/inkheart/submissions/${submissionId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      
      // Update local state
      setSubmissions(submissions.map(sub => 
        sub._id === submissionId ? { ...sub, [field]: value } : sub
      ));
      
      alert('Status updated successfully!');
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Submissions Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Student Submissions</h2>
            <p className="text-gray-600">Total: {submissions.length} submissions</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round 2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round 3</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruited</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length > 0 ? (
                  submissions.map((submission, index) => (
                    <tr key={submission._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.rollNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.score}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={submission.qualifiedRound2} 
                            onChange={(e) => handleStatusUpdate(submission._id, 'qualifiedRound2', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {submission.qualifiedRound2 ? 'Qualified' : 'Not Qualified'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={submission.qualifiedRound3} 
                            onChange={(e) => handleStatusUpdate(submission._id, 'qualifiedRound3', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {submission.qualifiedRound3 ? 'Qualified' : 'Not Qualified'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={submission.recruited} 
                            onChange={(e) => handleStatusUpdate(submission._id, 'recruited', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {submission.recruited ? 'Recruited' : 'Not Recruited'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No submissions found.
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

export default AdminSubmissionsDashboard;