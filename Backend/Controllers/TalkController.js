const Talk = require("../Models/Talk");

// Add a new talk
const addTalk = async (req, res) => {
  try {
    const { title, talkUrl } = req.body;
    const newTalk = new Talk({ title, talkUrl });
    await newTalk.save();
    res.status(201).json(newTalk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all talks
const getTalks = async (req, res) => {
  try {
    const talks = await Talk.find().sort({ date: -1 });
    res.status(200).json(talks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a talk
const deleteTalk = async (req, res) => {
  try {
    await Talk.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Talk deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addTalk, getTalks, deleteTalk};
