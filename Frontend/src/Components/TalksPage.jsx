import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Importing moment.js for date formatting

const TalksPage = () => {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/gettalks");
      setTalks(response.data);
    } catch (error) {
      console.error("Error fetching talks:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">All Talks</h2>

        {talks.length === 0 ? (
          <p className="text-center text-gray-400">No talks available.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {talks.map((talk) => (
              <div
                key={talk._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Date: {moment(talk.date).format("MMMM Do YYYY")}
                </p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="w-full rounded-lg"
                    src={talk.talkUrl.replace("watch?v=", "embed/")}
                    title={talk.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalksPage;
