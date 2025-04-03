import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const Chat = () => {
  const { clubId, sigId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Improved user data retrieval with validation
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        throw new Error("No user data found");
      }
      
      const parsedData = JSON.parse(userData);
      if (!parsedData.token) {
        throw new Error("No valid token found");
      }
      
      return parsedData;
    } catch (error) {
      console.error("Error retrieving user data:", error.message);
      return null;
    }
  };

  // Fetch messages from backend
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    
    const userData = getUserData();
    
    // Redirect to login if no valid user data
    if (!userData||userData.role!="user") {
      console.error("No authenticated user found");
      navigate("/home");
      return;
    }
    
    try {
      console.log("Fetching doubts with token:", userData.token.substring(0, 10) + "...");
      
      const res = await fetch(`https://tech--connect.azurewebsites.net/api/doubts/${clubId}/${sigId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        console.error(`Authentication error: ${res.status}`);
        // Clear invalid token
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        setError("Invalid data format received from server");
        return;
      }

      setMessages(data);
    } catch (error) {
      console.error("Error fetching doubts:", error);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval);
  }, [clubId, sigId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new doubt
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    const userData = getUserData();
    if (!userData||userData.role!="user") {
      navigate("/login");
      return;
    }
    
    if (!newMessage.trim()) return;

    const doubtData = {
      senderId: userData.userId || userData._id, // Handle both formats
      senderName: userData.name,
      text: newMessage,
    };

    try {
      const res = await fetch(`https://tech--connect.azurewebsites.net/api/doubts/${clubId}/${sigId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`,
        },
        body: JSON.stringify(doubtData),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to send doubt (${res.status})`);
      }

      const newDoubt = await res.json();
      setMessages((prev) => [...prev, newDoubt]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending doubt:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
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
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          {loading && messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">No doubts yet. Start the conversation!</div>
          ) : (
            messages.map((message) => {
              const userData = getUserData();
              const isCurrentUser = userData && message.senderName === userData.name;
              
              return (
                <div key={message._id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                  }`}>
                    <div className="font-semibold text-sm">{message.senderName}</div>
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              );
            })
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
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition"
            disabled={!getUserData() || loading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;