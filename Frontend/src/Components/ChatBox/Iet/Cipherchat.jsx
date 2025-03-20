// 
import React, { useState, useEffect } from "react";

const CipherChat = () => {
  const [messages, setMessages] = useState([]);
  const [adminReply, setAdminReply] = useState({});

  // Fetch user data & token from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : { token: null };
  };

  const userData = getUserData();

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/doubts/1/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });

      if (res.status === 401) {
        console.error("Unauthorized: Invalid or missing token.");
        return;
      }

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle input change for admin reply
  const handleAdminReplyChange = (e, messageId) => {
    setAdminReply({
      ...adminReply,
      [messageId]: e.target.value,
    });
  };

  // Handle sending admin reply
  const handleAdminReply = async (doubtId) => {
    try {
      const res = await fetch("http://localhost:8080/api/doubts/1/1/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          text: adminReply[doubtId],
        }),
      });

      if (res.status === 401) {
        console.error("Unauthorized: Invalid or missing token.");
        return;
      }

      const newReply = await res.json();
      setMessages((prev) => [...prev, newReply]);
      setAdminReply({ ...adminReply, [doubtId]: "" });
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Cipher Doubts</h1>

      {messages.length === 0 ? (
        <p>No doubts asked yet!</p>
      ) : (
        messages.map((message) => (
          <div key={message._id} className="mb-4">
            <p className={`font-semibold ${message.senderName === "Admin" ? "text-blue-400" : "text-green-400"}`}>
              {message.senderName}:
            </p>
            <p>{message.text}</p>

            {message.senderName !== "Admin" && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Reply as Admin..."
                  className="bg-gray-700 text-white p-2 rounded w-full"
                  value={adminReply[message._id] || ""}
                  onChange={(e) => handleAdminReplyChange(e, message._id)}
                />
                <button
                  onClick={() => handleAdminReply(message._id)}
                  className="bg-blue-600 text-white p-2 mt-2 rounded"
                >
                  Reply
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CipherChat;
