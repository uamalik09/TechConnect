const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  clubId: String,
  sigId: String,
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  senderName: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doubt", doubtSchema);