import React, { useState, useEffect } from 'react';

const AdminSubmissionsDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [modifiedSubmissions, setModifiedSubmissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [additionalMarks, setAdditionalMarks] = useState({});
  const [interviewSlots, setInterviewSlots] = useState({});
  const [filter, setFilter] = useState({
    searchTerm: '',
    sortBy: 'totalScore',
    sortOrder: 'desc',
    filterQualified: 'all'
  });

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
        
        const response = await fetch('http://localhost:8080/results/iet/rovisp/submissions', {
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
        
        // Initialize additional marks with zero for each submission
        const initialAdditionalMarks = {};
        const initialInterviewSlots = {};
        data.forEach(submission => {
          initialAdditionalMarks[submission._id] = submission.additionalMarks || 0;
          initialInterviewSlots[submission._id] = submission.interviewSlot || '';
        });
        setAdditionalMarks(initialAdditionalMarks);
        setInterviewSlots(initialInterviewSlots);
        
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

  const handleAdditionalMarksChange = (submissionId, value) => {
    // Make sure value is properly converted to number
    const numValue = value === '' ? 0 : parseFloat(value);
    
    // Update additionalMarks state
    setAdditionalMarks(prev => ({
      ...prev,
      [submissionId]: numValue
    }));
    
    // Find submission and calculate total
    const submission = submissions.find(sub => sub._id === submissionId);
    const baseScore = submission ? (submission.score || 0) : 0;
    
    // Calculate total score
    const newTotalScore = baseScore + numValue;
    
    console.log(`Updating submission ${submissionId}:`, {
      baseScore,
      additionalMarks: numValue,
      totalScore: newTotalScore
    });
    
    // Update the modifiedSubmissions state
    setModifiedSubmissions(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        additionalMarks: numValue,
        totalScore: newTotalScore
      }
    }));
  };

  const handleInterviewSlotChange = (submissionId, value) => {
    console.log(`Setting interview slot for ${submissionId} to:`, value);
    
    // Update interviewSlots state with the raw value
    setInterviewSlots(prev => ({
      ...prev,
      [submissionId]: value
    }));
    
    // Store ISO string in modified submissions
    if (value) {
      // Create a date object that correctly interprets the local datetime
      const localDate = new Date(value);
      
      // Update the modifiedSubmissions state with the ISO string
      setModifiedSubmissions(prev => ({
        ...prev,
        [submissionId]: {
          ...prev[submissionId],
          interviewSlot: localDate.toISOString()
        }
      }));
    } else {
      // Handle empty value
      setModifiedSubmissions(prev => ({
        ...prev,
        [submissionId]: {
          ...prev[submissionId],
          interviewSlot: null
        }
      }));
    }
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

  const getTotalScore = (submission) => {
    // Try to get from modified submissions first
    if (modifiedSubmissions[submission._id] && 
        modifiedSubmissions[submission._id].totalScore !== undefined) {
      console.log(`Using modified total score for ${submission._id}:`, 
        modifiedSubmissions[submission._id].totalScore);
      return modifiedSubmissions[submission._id].totalScore;
    }
    
    // Otherwise calculate from the original values
    const baseScore = submission.score || 0;
    const additional = additionalMarks[submission._id] || 0;
    const calculatedTotal = baseScore + additional;
    
    console.log(`Calculating total score for ${submission._id}:`, {
      baseScore,
      additional,
      calculatedTotal
    });
    
    return calculatedTotal;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date format for:", dateString);
        return '';
      }
      
      // Format date in local timezone for datetime-local input
      // YYYY-MM-DDThh:mm format
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Invalid date format:", error);
      return '';
    }
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
        return fetch(`http://localhost:8080/results/iet/rovisp/submissions/${submissionId}/status`, {
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

      // In saveAllChanges function, modify the setSubmissions call:
      const updatedResults = await Promise.all(
        results.map((response, index) => response.json())
      );

      setSubmissions(submissions.map(sub => {
        if (modifiedSubmissions[sub._id]) {
          console.log(`Updating submission from server:`, 
            { before: sub, after: { ...sub, ...modifiedSubmissions[sub._id] } });
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
    // Reset additional marks to original values
    const originalAdditionalMarks = {};
    const originalInterviewSlots = {};
    submissions.forEach(submission => {
      originalAdditionalMarks[submission._id] = submission.additionalMarks || 0;
      originalInterviewSlots[submission._id] = submission.interviewSlot || '';
    });
    setAdditionalMarks(originalAdditionalMarks);
    setInterviewSlots(originalInterviewSlots);
    setModifiedSubmissions({});
  };

  // Filter and sort submissions
  const getFilteredAndSortedSubmissions = () => {
    return submissions
      .filter(submission => {
        // Apply search filter
        const searchMatch = 
          submission.studentName?.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
          submission.rollNumber?.toLowerCase().includes(filter.searchTerm.toLowerCase());
          
        // Apply qualification filter
        let qualificationMatch = true;
        if (filter.filterQualified === 'qualified2') {
          qualificationMatch = getCurrentValue(submission, 'qualifiedRound2');
        } else if (filter.filterQualified === 'qualified3') {
          qualificationMatch = getCurrentValue(submission, 'qualifiedRound3');
        } else if (filter.filterQualified === 'recruited') {
          qualificationMatch = getCurrentValue(submission, 'recruited');
        }
        
        return searchMatch && qualificationMatch;
      })
      .sort((a, b) => {
        // Handle sorting
        let valueA, valueB;
        
        if (filter.sortBy === 'totalScore') {
          valueA = getTotalScore(a);
          valueB = getTotalScore(b);
        } else if (filter.sortBy === 'studentName') {
          valueA = a.studentName || '';
          valueB = b.studentName || '';
          return filter.sortOrder === 'asc' 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        } else {
          valueA = a[filter.sortBy] || 0;
          valueB = b[filter.sortBy] || 0;
        }
        
        return filter.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
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
  const filteredSubmissions = getFilteredAndSortedSubmissions();

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
          
          {/* Search and filter controls */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                value={filter.searchTerm}
                onChange={(e) => setFilter({...filter, searchTerm: e.target.value})}
                placeholder="Search by name or roll number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="flex space-x-2">
                <select
                  id="sortBy"
                  value={filter.sortBy}
                  onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="totalScore">Total Score</option>
                  <option value="studentName">Name</option>
                  <option value="score">Base Score</option>
                </select>
                <button
                  onClick={() => setFilter({...filter, sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc'})}
                  className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  {filter.sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="filterQualified" className="block text-sm font-medium text-gray-700 mb-1">Filter By Status</label>
              <select
                id="filterQualified"
                value={filter.filterQualified}
                onChange={(e) => setFilter({...filter, filterQualified: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Submissions</option>
                <option value="qualified2">Qualified for Round 2</option>
                <option value="qualified3">Qualified for Round 3</option>
                <option value="recruited">Recruited</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interview Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round 1</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round 2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruited</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission, index) => {
                    const rowModified = isModified(submission._id);
                    return (
                      <tr 
                        key={submission._id} 
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${rowModified ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{submission.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.rollNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input 
                            type="text" 
                            value={additionalMarks[submission._id] || 0}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                handleAdditionalMarksChange(submission._id, value);
                              }
                            }}
                            className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {getTotalScore(submission)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input 
                            type="datetime-local" 
                            value={formatDate(interviewSlots[submission._id])}
                            onChange={(e) => handleInterviewSlotChange(submission._id, e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
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
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                      No submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Qualification Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Submissions:</span>
                <span className="font-medium">{submissions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Qualified for Round 2:</span>
                <span className="font-medium">
                  {submissions.filter(s => getCurrentValue(s, 'qualifiedRound2')).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Qualified for Round 3:</span>
                <span className="font-medium">
                  {submissions.filter(s => getCurrentValue(s, 'qualifiedRound3')).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recruited:</span>
                <span className="font-medium">
                  {submissions.filter(s => getCurrentValue(s, 'recruited')).length}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Score Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-medium">
                  {submissions.length 
                    ? (submissions.reduce((sum, s) => sum + getTotalScore(s), 0) / submissions.length).toFixed(2) 
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Highest Score:</span>
                <span className="font-medium">
                  {submissions.length 
                    ? Math.max(...submissions.map(s => getTotalScore(s))).toFixed(2) 
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lowest Score:</span>
                <span className="font-medium">
                  {submissions.length 
                    ? Math.min(...submissions.map(s => getTotalScore(s))).toFixed(2) 
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  const threshold = window.prompt("Enter minimum score threshold for Round 2 qualification:");
                  if (threshold) {
                    const numThreshold = parseFloat(threshold);
                    const changes = {};
                    submissions.forEach(sub => {
                      if (getTotalScore(sub) >= numThreshold) {
                        changes[sub._id] = {
                          ...modifiedSubmissions[sub._id],
                          qualifiedRound2: true
                        };
                      }
                    });
                    setModifiedSubmissions({...modifiedSubmissions, ...changes});
                  }
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Auto-Qualify by Score
              </button>
             
              <button 
                onClick={() => {
                  const confirmed = window.confirm("Are you sure you want to send email notifications to all qualified candidates?");
                  if (confirmed) {
                    alert("Email notification feature will be implemented soon!");
                  }
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Notify Qualified Candidates
              </button>
            </div>
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