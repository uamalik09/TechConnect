import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Fetch user data & token from localStorage
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
    return { token: null, role: "" };
  }
};
const SigChat = () => {
  const [messages, setMessages] = useState([]);
  const [adminReply, setAdminReply] = useState({});
  const [userRole, setUserRole] = useState("null"); 
  const [replyingTo, setReplyingTo] = useState(null);
  const navigate = useNavigate();
  const { sigId } = useParams(); // Get the SIG ID from URL params

  

  const userData = getUserData();

  useEffect(() => {
    if (!userData||!userData.token) {
      console.error("No token found, redirecting to login.");
      navigate("/login");
      return;
    }
    if (userData.role) {
      setUserRole(userData.role);
      if (userData.role !== "ieee") {
        console.error("Unauthorized role, redirecting.");
        navigate("/home");
      }
    }
  }, [userData.role, navigate]);

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      console.log(`Fetching doubts for SIG ${sigId} with token:`, userData.token?.substring(0, 10) + "...");
      
      const res = await fetch(`http://localhost:8080/api/doubts/2/${sigId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`,
        },
      });

      if (res.status === 401) {
        console.error("Unauthorized: Invalid or missing token.");
        localStorage.removeItem("user"); // Clear invalid token
        navigate("/login");
        return;
      }
      if (res.status === 403) {
        console.error("Forbidden: User not authorized.");
        return;
      }

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  // Handle input change for admin reply
  const handleAdminReplyChange = (e, messageId) => {
    setAdminReply({
      ...adminReply,
      [messageId]: e.target.value,
    });
  };

  // Start replying to a specific message
  const startReply = (message) => {
    setReplyingTo(message);
    // Initialize reply field if not already set
    if (!adminReply[message._id]) {
      setAdminReply({
        ...adminReply,
        [message._id]: "",
      });
    }
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Handle sending admin reply with reference to original doubt
  const handleAdminReply = async (doubtId) => {
    if (!adminReply[doubtId]?.trim()) {
      console.error("Reply cannot be empty.");
      return;
    }

    try {
      // Find the original doubt
      const originalDoubt = messages.find(msg => msg._id === doubtId);
      
      // Create reply text with reference to the original message
      const replyText = `@${originalDoubt.senderName}: "${originalDoubt.text.substring(0, 40)}${originalDoubt.text.length > 40 ? '...' : ''}" - ${adminReply[doubtId].trim()}`;
      
      const res = await fetch(
        `http://localhost:8080/api/doubts/2/${sigId}/admin/${doubtId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData.token}`,
          },
          body: JSON.stringify({
            text: replyText,
            referencedDoubtId: doubtId,
          }),
        }
      );

      if (res.status === 403) {
        console.error("Access Denied: Only club admins can reply.");
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to send reply (${res.status})`);
      }

      const newReply = await res.json();
      setMessages((prev) => [...prev, newReply]);
      setAdminReply({ ...adminReply, [doubtId]: "" });
      setReplyingTo(null);
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval);
  }, [sigId]); // Add sigId to dependency array to refetch when SIG changes

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
  };

  // Check if user is allowed to reply (has the correct admin role)
  const canReply = () => {
    return ["ieee"].includes(userRole);
  };

  // Map SIG IDs to names
  const sigNames = {
    1: 'Compsoc',
    2: 'Diode', 
    3: 'Piston',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{sigNames[sigId]} Doubts</h1>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No doubts asked yet!</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const isAdmin = message.senderName === "Admin";
            const isReplyingToThis = replyingTo && replyingTo._id === message._id;
            
            return (
              <div key={message._id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className={`font-semibold ${isAdmin ? "text-blue-400" : "text-green-400"}`}>
                    {message.senderName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <p className="mt-2 text-gray-300">{message.text}</p>
                
                {/* Admin reply options */}
                {!isAdmin && canReply() && (
                  <div className="mt-3 flex justify-end">
                    {!isReplyingToThis ? (
                      <button
                        onClick={() => startReply(message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Reply
                      </button>
                    ) : (
                      <div className="w-full mt-2">
                        <div className="bg-gray-700 p-2 rounded mb-2 text-sm">
                          <span className="text-blue-400">Replying to {message.senderName}:</span>
                          <p className="text-gray-400 italic">"{message.text.substring(0, 60)}{message.text.length > 60 ? '...' : ''}"</p>
                        </div>
                        
                        <textarea
                          placeholder="Type your reply..."
                          className="bg-gray-700 text-white p-2 rounded w-full resize-y"
                          rows="2"
                          value={adminReply[message._id] || ""}
                          onChange={(e) => handleAdminReplyChange(e, message._id)}
                        />
                        
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            onClick={cancelReply}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAdminReply(message._id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                            disabled={!adminReply[message._id]?.trim()}
                          >
                            Send Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SigChat;