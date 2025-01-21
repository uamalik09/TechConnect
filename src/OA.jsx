import React,{ useState } from 'react';
import './OA.css';

const OAPage=()=>{
    const[instructions,setInstructions]=useState('');
    const[link,setLink]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert('Online Assesment Details Saved!');
    };

    return(
        <div className="OAContainer">
            <h1>Online Assesment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='instructions'>Add Instructions:</label>
                    <textarea id='instructions' rows='5' placeholder='Enter the instructions for the online assessment...'
                    value={instructions} onChange={(e)=>setInstructions(e.target.value)}
                    required />
                </div>
                <div>
                    <label htmlFor="oa-link">Online Assessment Link:</label>
                    <input
                       type="url"
                       id="oa-link"
                       placeholder="Enter the link to the online assessment"
                       value={link}
                       onChange={(e) => setLink(e.target.value)}
                       required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
           
      {instructions && link && (
        <div className="saved-details">
          <h2>Saved Details:</h2>
          <p><strong>Instructions:</strong> {instructions}</p>
          <p><strong>Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
        </div>
      )}
        </div>
    );
};

export default OAPage