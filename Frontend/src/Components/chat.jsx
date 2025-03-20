// 
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const Chat = () => {
  const { clubId, sigId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch user data & token from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : { name: "Student", userId: null, token: null };
  };

  const userData = getUserData();

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/doubts/${clubId}/${sigId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`, // Attach token
        },
      });

      if (res.status === 401) {
        console.error("Unauthorized: Invalid or missing token.");
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return;
      }

      setMessages(data);
    } catch (error) {
      console.error("Error fetching doubts:", error);
    }
  };

  // Send a new doubt
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const doubtData = {
      senderId: userData.userId,
      senderName: userData.name,
      text: newMessage,
    };

    try {
      const res = await fetch(`http://localhost:8080/api/doubts/${clubId}/${sigId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`, // Attach token
        },
        body: JSON.stringify(doubtData),
      });

      if (res.status === 401) {
        console.error("Unauthorized: Invalid or missing token.");
        return;
      }

      if (!res.ok) throw new Error("Failed to send doubt");

      const newDoubt = await res.json();
      setMessages((prev) => [...prev, newDoubt]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending doubt:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [clubId, sigId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center shadow-lg">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Doubt Portal</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">No doubts yet. Start the conversation!</div>
          ) : (
            messages.map((message) => (
              <div key={message._id} className={`flex ${message.senderName === userData.name ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${message.senderName === userData.name ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
                  <div className="font-semibold text-sm">{message.senderName}</div>
                  <p>{message.text}</p>
                  <p className="text-xs text-gray-300 mt-1 text-right">{formatTime(message.timestamp)}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSendMessage} className="bg-gray-800 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask your doubt here..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition">
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
