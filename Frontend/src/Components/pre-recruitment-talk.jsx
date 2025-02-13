import React, { useState, useEffect } from "react";
import axios from "axios";

const Talk = () => {
  const [talks, setTalks] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    try {
      const response = await axios.get("/api/talks");
      setTalks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching talks:", error);
    }
  };

  const addTalk = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/talks", { title, videoUrl, date });
      setTitle("");
      setVideoUrl("");
      setDate("");
      fetchTalks();
    } catch (error) {
      console.error("Error adding talk:", error);
    }
  };
  

  const deleteTalk = async (id) => {
    try {
      await axios.delete(`/api/talks/${id}`);
      fetchTalks();
    } catch (error) {
      console.error("Error deleting talk:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Pre-Recruitment Talks</h1>
      <form onSubmit={addTalk} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Talk
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Talk List</h2>
      <ul className="space-y-4">
        {talks.length > 0 ? (
          talks.map((talk) => (
            <li key={talk._id} className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{talk.title}</h3>
              <p className="text-blue-600">
                <a href={talk.videoUrl} target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </p>
              <p className="text-gray-600">{talk.date}</p>
              <button
                onClick={() => deleteTalk(talk._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 mt-2 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No talks available.</p>
        )}
      </ul>
    </div>
  );
};

export default Talk;
