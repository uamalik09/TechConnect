import React, { useEffect, useState } from 'react'; 

const QuizStatus = () => {   
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);   
  const [status, setStatus] = useState(null);    

  useEffect(() => {     
    const fetchQuizStatus = async () => {       
      try {         
        setLoading(true);                  
        // Get the authentication token from localStorage or wherever you store it         
        const token = localStorage.getItem('token');                  
        
        // Make the fetch request with the token in the Authorization header
        // Either update this URL to match the actual route path
        const response = await fetch('http://localhost:8080/status/iet/cipher/quiz-status', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Check if the request was successful
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('You need to be logged in to view your quiz status.');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch quiz status');
          }
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        console.log('API Response:', data);         
        setStatus(data.status);         
        setLoading(false);       
      } catch (err) {         
        console.error('Error details:', err);                  
        setError(err.message || 'Unable to fetch quiz status. Please try again later.');
        setLoading(false);       
      }     
    };      

    fetchQuizStatus();   
  }, []);    

  if (loading) return <div className="text-center py-5 text-gray-300 bg-gray-900">Loading quiz status...</div>;      
  
  if (error) return <div className="text-center py-5 text-red-400 bg-gray-900">{error}</div>;      
  
  if (!status || !status.hasSubmitted) {     
    return (       
      <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 text-gray-300">         
        <h2 className="text-xl font-bold mb-3 text-white">Quiz Status</h2>         
        <p>You haven't submitted any quiz yet.</p>       
      </div>     
    );   
  }    

  return (     
    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 text-gray-300">       
      <h2 className="text-xl font-bold mb-3 text-white">Quiz Status</h2>              
      
      <div className="grid grid-cols-2 gap-3">         
        <div>           
          <p className="font-semibold text-gray-400">Quiz Model:</p>           
          <p className="text-white">{status.quizModel}</p>         
        </div>                  
        
        <div>           
          <p className="font-semibold text-gray-400">Score:</p>           
          <p className="text-white">{status.score}</p>         
        </div>                  
        
        <div>           
          <p className="font-semibold text-gray-400">Round 2 Qualification:</p>           
          <p className={status.qualifiedRound2 ? "text-green-400" : "text-red-400"}>             
            {status.qualifiedRound2 ? "Qualified" : "Not Qualified"}           
          </p>         
        </div>                  
        
        <div>           
          <p className="font-semibold text-gray-400">Round 3 Qualification:</p>           
          <p className={status.qualifiedRound3 ? "text-green-400" : "text-red-400"}>             
            {status.qualifiedRound3 ? "Qualified" : "Not Qualified"}           
          </p>         
        </div>                  
        
        <div>           
          <p className="font-semibold text-gray-400">Recruitment Status:</p>           
          <p className={status.recruited ? "text-green-400 font-bold" : "text-blue-400"}>             
            {status.recruited ? "Recruited" : "Under Review"}           
          </p>         
        </div>                  
        
        <div>           
          <p className="font-semibold text-gray-400">Submission Date:</p>           
          <p className="text-white">{status.submittedAt ? new Date(status.submittedAt).toLocaleDateString() : 'N/A'}</p>         
        </div>       
      </div>     
    </div>   
  ); 
};  

export default QuizStatus;