const Doubt = require("../Models/Doubt");

// Fetch doubts
const getDoubts = async (req, res) => {
  const { clubId, sigId } = req.params;

  try {
    const messages = await Doubt.find({ clubId, sigId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching doubts:", err);
    res.status(500).json({ error: "Failed to fetch doubts" });
  }
};

// Post a doubt (Student)
const postDoubt = async (req, res) => {
  const { clubId, sigId } = req.params;
  const { senderId, senderName, text } = req.body;

  if (!text) return res.status(400).json({ error: "Doubt text is required" });

  try {
    const newDoubt = new Doubt({ clubId, sigId, senderId, senderName, text });
    await newDoubt.save();
    res.status(201).json(newDoubt);
  } catch (error) {
    console.error("Error posting doubt:", error);
    res.status(500).json({ error: "Failed to post doubt" });
  }
};

// Admin reply
const adminReply = async (req, res) => {
  const { clubId, sigId } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Reply text is required" });

  try {
    const reply = new Doubt({ clubId, sigId, senderName: "Admin", text, role: "admin" });
    await reply.save();
    res.status(201).json(reply);
  } catch (err) {
    console.error("Error posting admin reply:", err);
    res.status(500).json({ error: "Failed to post reply" });
  }
};

module.exports = { getDoubts, postDoubt, adminReply };