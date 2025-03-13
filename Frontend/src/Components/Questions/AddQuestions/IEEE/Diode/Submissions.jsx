import React, { useState, useEffect } from 'react';

const AdminSubmissionsDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [modifiedSubmissions, setModifiedSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
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

  const handleStatusChange = (submissionId, field, value) => {
    setModifiedSubmissions(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  };

  const isModified = (submissionId) => {
    return !!modifiedSubmissions[submissionId];
  };

  const getCurrentValue = (submission, field) => {
    if (modifiedSubmissions[submission._id] && modifiedSubmissions[submission._id][field] !== undefined) {
      return modifiedSubmissions[submission._id][field];
    }
    return submission[field];
  };

  const saveAllChanges = async () => {
    if (Object.keys(modifiedSubmissions).length === 0) {
      alert('No changes to save');
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updatePromises = Object.entries(modifiedSubmissions).map(([submissionId, changes]) => {
        return fetch(`http://localhost:8080/results/iet/inkheart/submissions/${submissionId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(changes)
        });
      });

      const results = await Promise.all(updatePromises);
      const failedUpdates = results.filter(response => !response.ok);

      if (failedUpdates.length) {
        throw new Error(`${failedUpdates.length} updates failed`);
      }

      setSubmissions(submissions.map(sub => {
        if (modifiedSubmissions[sub._id]) {
          return { ...sub, ...modifiedSubmissions[sub._id] };
        }
        return sub;
      }));
      setModifiedSubmissions({});
      alert('All changes saved successfully!');
    } catch (error) {
      alert('Error saving changes: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelChanges = () => {
    setModifiedSubmissions({});
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

  const hasModifications = Object.keys(modifiedSubmissions).length > 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Submissions Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Student Submissions</h2>
              <p className="text-gray-600">Total: {submissions.length} submissions</p>
            </div>
            <div className="flex space-x-4">
              {hasModifications && (
                <>
                  <button
                    onClick={cancelChanges}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAllChanges}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save All Changes'}
                  </button>
                </>
              )}
            </div>
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
                  submissions.map((submission, index) => {
                    const rowModified = isModified(submission._id);
                    return (
                      <tr 
                        key={submission._id} 
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${rowModified ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.rollNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={getCurrentValue(submission, 'qualifiedRound2')} 
                              onChange={(e) => handleStatusChange(submission._id, 'qualifiedRound2', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {getCurrentValue(submission, 'qualifiedRound2') ? 'Qualified' : 'Not Qualified'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={getCurrentValue(submission, 'qualifiedRound3')} 
                              onChange={(e) => handleStatusChange(submission._id, 'qualifiedRound3', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {getCurrentValue(submission, 'qualifiedRound3') ? 'Qualified' : 'Not Qualified'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={getCurrentValue(submission, 'recruited')} 
                              onChange={(e) => handleStatusChange(submission._id, 'recruited', e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {getCurrentValue(submission, 'recruited') ? 'Recruited' : 'Not Recruited'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
        
        {hasModifications && (
          <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 p-4 flex justify-center shadow-lg">
            <div className="flex space-x-4">
              <button
                onClick={cancelChanges}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                disabled={isSaving}
              >
                Cancel Changes
              </button>
              <button
                onClick={saveAllChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : `Save All Changes (${Object.keys(modifiedSubmissions).length})`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubmissionsDashboard;