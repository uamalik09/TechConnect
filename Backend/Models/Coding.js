const mongoose = require("mongoose");

const linkSchema = () => new mongoose.Schema({ url: String });

const coding = {
  ietCoding: mongoose.model("ietCoding", linkSchema()),
  ieeeCoding: mongoose.model("ieeeCoding", linkSchema()),
  acmCoding: mongoose.model("acmCoding", linkSchema()),
  ieCoding: mongoose.model("ieCoding", linkSchema()),
  isteCoding: mongoose.model("isteCoding", linkSchema()),
};

module.exports = coding;