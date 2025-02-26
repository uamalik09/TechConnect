// const Talk = require("../Models/Talk");

// // Add a new talk
// const addTalk = async (req, res) => {
//   try {
//     const { title, talkUrl } = req.body;
//     const newTalk = new Talk({ title, talkUrl });
//     await newTalk.save();
//     res.status(201).json(newTalk);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all talks
// const getTalks = async (req, res) => {
//   try {
//     const talks = await Talk.find().sort({ date: -1 });
//     res.status(200).json(talks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a talk
// const deleteTalk = async (req, res) => {
//   try {
//     await Talk.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Talk deleted successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {addTalk, getTalks, deleteTalk};

const mongoose = require("mongoose");
const talkModels = require("../Models/Talk");

const addTalk = async (req, res, type) => {
  try {
    const { title, talkUrl } = req.body;
    const TalkModel = mongoose.model(type);
    const newTalk = new TalkModel({ title, talkUrl });
    await newTalk.save();
    res.status(201).json({ message: `${type} talk added successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTalks = async (req, res, type) => {
  try {
    const TalkModel = mongoose.model(type);
    const talks = await TalkModel.find().sort({ date: -1 });
    res.status(200).json(talks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTalk = async (req, res, type) => {
  try {
    const { id } = req.params;
    const TalkModel = mongoose.model(type);
    const deletedTalk = await TalkModel.findByIdAndDelete(id);

    if (!deletedTalk) {
      return res.status(404).json({ message: `${type} talk not found!` });
    }

    res.status(200).json({ message: `${type} talk deleted successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addTalk, getTalks, deleteTalk };

