// const mongoose = require("mongoose");

// const announcementSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Announcement", announcementSchema);

const mongoose = require("mongoose");

const createAnnouncementSchema = () =>
  new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

const models = {
  ietAnnouncement: mongoose.model("ietAnnouncement", createAnnouncementSchema()),
  ieeeAnnouncement: mongoose.model("ieeeAnnouncement", createAnnouncementSchema()),
  acmAnnouncement: mongoose.model("acmAnnouncement", createAnnouncementSchema()),
  ieAnnouncement: mongoose.model("ieAnnouncement", createAnnouncementSchema()),
  isteAnnouncement: mongoose.model("isteAnnouncement", createAnnouncementSchema()),
};

module.exports = models;

