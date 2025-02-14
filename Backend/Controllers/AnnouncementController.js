const Announcement = require("../Models/Announcement");

const addAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newAnnouncement = new Announcement({ title, message });
    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAnnouncement = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
  
      if (!deletedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found!" });
      }
  
      res.status(200).json({ message: "Announcement deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { addAnnouncement, getAnnouncements, deleteAnnouncement };