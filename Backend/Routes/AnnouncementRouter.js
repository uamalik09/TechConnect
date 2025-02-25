// const express = require("express");
// const router = express.Router();
// const { addAnnouncement, getAnnouncements, deleteAnnouncement } = require("../Controllers/AnnouncementController");
// const { announcementValidation } = require("../Middlewares/AnnouncementValidation");

// // Routes
// router.post("/addannouncement", announcementValidation, addAnnouncement);
// router.get("/getannouncement", getAnnouncements);
// router.delete("/deleteannouncement/:id", deleteAnnouncement);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { addAnnouncement, getAnnouncements, deleteAnnouncement } = require("../Controllers/AnnouncementController");
const { announcementValidation } = require("../Middlewares/AnnouncementValidation");

// Routes for IET Announcements
router.post("/iet/add", announcementValidation, (req, res) => addAnnouncement(req, res, "ietAnnouncement"));
router.get("/iet/get", (req, res) => getAnnouncements(req, res, "ietAnnouncement"));
router.delete("/iet/delete/:id", (req, res) => deleteAnnouncement(req, res, "ietAnnouncement"));

// Routes for IEEE Announcements
router.post("/ieee/add", announcementValidation, (req, res) => addAnnouncement(req, res, "ieeeAnnouncement"));
router.get("/ieee/get", (req, res) => getAnnouncements(req, res, "ieeeAnnouncement"));
router.delete("/ieee/delete/:id", (req, res) => deleteAnnouncement(req, res, "ieeeAnnouncement"));

// Routes for ACM Announcements
router.post("/acm/add", announcementValidation, (req, res) => addAnnouncement(req, res, "acmAnnouncement"));
router.get("/acm/get", (req, res) => getAnnouncements(req, res, "acmAnnouncement"));
router.delete("/acm/delete/:id", (req, res) => deleteAnnouncement(req, res, "acmAnnouncement"));

// Routes for IE Announcements
router.post("/ie/add", announcementValidation, (req, res) => addAnnouncement(req, res, "ieAnnouncement"));
router.get("/ie/get", (req, res) => getAnnouncements(req, res, "ieAnnouncement"));
router.delete("/ie/delete/:id", (req, res) => deleteAnnouncement(req, res, "ieAnnouncement"));

// Routes for ISTE Announcements
router.post("/iste/add", announcementValidation, (req, res) => addAnnouncement(req, res, "isteAnnouncement"));
router.get("/iste/get", (req, res) => getAnnouncements(req, res, "isteAnnouncement"));
router.delete("/iste/delete/:id", (req, res) => deleteAnnouncement(req, res, "isteAnnouncement"));

module.exports = router;

