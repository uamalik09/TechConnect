const mongoose = require("mongoose");

const talkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  talkUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Talk = mongoose.model("Talk", talkSchema);
module.exports = Talk;
