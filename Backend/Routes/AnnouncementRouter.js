const express = require("express");
const router = express.Router();
const { addAnnouncement, getAnnouncements, deleteAnnouncement } = require("../Controllers/AnnouncementController");
const { announcementValidation } = require("../Middlewares/AnnouncementValidation");

// Routes
router.post("/addannouncement", announcementValidation, addAnnouncement);
router.get("/getannouncement", getAnnouncements);
router.delete("/deleteannouncement/:id", deleteAnnouncement);

module.exports = router;
