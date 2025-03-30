const mongoose = require("mongoose");
const Announcement = require("../Models/Announcement");

const addAnnouncement = async (req, res, type) => {
  try {
    const { title, message } = req.body;
    const AnnouncementModel = mongoose.model(type);
    const newAnnouncement = new AnnouncementModel({ title, message });
    await newAnnouncement.save();
    res.status(201).json({ message: `${type} added successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAnnouncements = async (req, res, type) => {
  try {
    const AnnouncementModel = mongoose.model(type);
    const announcements = await AnnouncementModel.find().sort({ date: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAnnouncement = async (req, res, type) => {
  try {
    const { id } = req.params;
    const AnnouncementModel = mongoose.model(type);
    const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: `${type} not found!` });
    }

    res.status(200).json({ message: `${type} deleted successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addAnnouncement, getAnnouncements, deleteAnnouncement };
