// const mongoose = require("mongoose");

// const talkSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   talkUrl: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const Talk = mongoose.model("Talk", talkSchema);
// module.exports = Talk;

const mongoose = require("mongoose");

const createTalkSchema = () =>
  new mongoose.Schema({
    title: { type: String, required: true },
    talkUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
  });

const talkModels = {
  ietTalk: mongoose.model("ietTalk", createTalkSchema()),
  ieeeTalk: mongoose.model("ieeeTalk", createTalkSchema()),
  acmTalk: mongoose.model("acmTalk", createTalkSchema()),
  ieTalk: mongoose.model("ieTalk", createTalkSchema()),
  isteTalk: mongoose.model("isteTalk", createTalkSchema()),
};

module.exports = talkModels;

