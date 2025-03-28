
const express = require("express");
const router = express.Router();
const { addAnnouncement, getAnnouncements, deleteAnnouncement } = require("../Controllers/AnnouncementController");
const { announcementValidation } = require("../Middlewares/AnnouncementValidation");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");

// Protect routes based on roles
router.post("/iet/add", authenticateUser, authorizeRoles("iet"), announcementValidation, (req, res) => addAnnouncement(req, res, "ietAnnouncement"));
router.get("/iet/get", authenticateUser, authorizeRoles("iet"), (req, res) => getAnnouncements(req, res, "ietAnnouncement"));
router.delete("/iet/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteAnnouncement(req, res, "ietAnnouncement"));
router.get("/iet/get/student", authenticateUser, authorizeRoles("user"), (req, res) => getAnnouncements(req, res, "ietAnnouncement"));

router.post("/ieee/add", authenticateUser, authorizeRoles("ieee"), announcementValidation, (req, res) => addAnnouncement(req, res, "ieeeAnnouncement"));
router.get("/ieee/get", authenticateUser, authorizeRoles("ieee"), (req, res) => getAnnouncements(req, res, "ieeeAnnouncement"));
router.delete("/ieee/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteAnnouncement(req, res, "ieeeAnnouncement"));
router.get("/ieee/get/student", authenticateUser, authorizeRoles("user"), (req, res) => getAnnouncements(req, res, "ieeeAnnouncement"));

router.post("/acm/add", authenticateUser, authorizeRoles("acm"), announcementValidation, (req, res) => addAnnouncement(req, res, "acmAnnouncement"));
router.get("/acm/get", authenticateUser, authorizeRoles("acm"), (req, res) => getAnnouncements(req, res, "acmAnnouncement"));
router.delete("/acm/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteAnnouncement(req, res, "acmAnnouncement"));
router.get("/acm/get/student", authenticateUser, authorizeRoles("user"), (req, res) => getAnnouncements(req, res, "acmAnnouncement"));

router.post("/ie/add", authenticateUser, authorizeRoles("ie"), announcementValidation, (req, res) => addAnnouncement(req, res, "ieAnnouncement"));
router.get("/ie/get", authenticateUser, authorizeRoles("ie"), (req, res) => getAnnouncements(req, res, "ieAnnouncement"));
router.delete("/ie/delete/:id", authenticateUser, authorizeRoles("ie"), (req, res) => deleteAnnouncement(req, res, "ieAnnouncement"));
router.get("/ie/get/student", authenticateUser, authorizeRoles("user"), (req, res) => getAnnouncements(req, res, "ieAnnouncement"));

router.post("/iste/add", authenticateUser, authorizeRoles("iste"), announcementValidation, (req, res) => addAnnouncement(req, res, "isteAnnouncement"));
router.get("/iste/get", authenticateUser, authorizeRoles("iste"), (req, res) => getAnnouncements(req, res, "isteAnnouncement"));
router.delete("/iste/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteAnnouncement(req, res, "isteAnnouncement"));
router.get("/iste/get/student", authenticateUser, authorizeRoles("user"), (req, res) => getAnnouncements(req, res, "isteAnnouncement"));

module.exports = router;



