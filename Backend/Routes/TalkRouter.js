const express = require("express");
const router = express.Router();
const {addTalk, getTalks, deleteTalk} = require('../Controllers/TalkController');

// Add a new talk
router.post("/addtalk", addTalk);

// Get all talks
router.get("/gettalks", getTalks);

// Delete a talk
router.delete("/deletetalk/:id", deleteTalk);

module.exports = router;
