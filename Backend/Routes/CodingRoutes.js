const express = require("express");
const router = express.Router();

const {getLinks, addLink, updateLink, deleteLink} = require('../Controllers/CodingController');
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");

router.post("/iet/addcode", authenticateUser, authorizeRoles("iet"), (req, res) => addLink(req, res, "ietCoding"));
router.get("/iet/getcode", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getLinks(req, res, "ietCoding"));
router.delete("/iet/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteLink(req, res, "ietCoding"));
router.put("/iet/update/:id", authenticateUser, authorizeRoles("iet"), (req, res) => updateLink(req, res, "ietCoding"));

router.post("/ieee/addcode", authenticateUser, authorizeRoles("ieee"), (req, res) => addLink(req, res, "ieeeCoding"));
router.get("/ieee/getcode", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getLinks(req, res, "ieeeCoding"));
router.delete("/ieee/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteLink(req, res, "ieeeCoding"));
router.put("/ieee/update/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => updateLink(req, res, "ieeeCoding"));

router.post("/acm/addcode", authenticateUser, authorizeRoles("acm"), (req, res) => addLink(req, res, "acmCoding"));
router.get("/acm/getcode", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getLinks(req, res, "acmCoding"));
router.delete("/acm/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteLink(req, res, "acmCoding"));
router.put("/acm/update/:id", authenticateUser, authorizeRoles("acm"), (req, res) => updateLink(req, res, "acmCoding"));

router.post("/ie/addcode", authenticateUser, authorizeRoles("ie"), (req, res) => addLink(req, res, "ieCoding"));
router.get("/ie/getcode", authenticateUser, authorizeRoles("ie", "user"), (req, res) => getLinks(req, res, "ieCoding"));
router.delete("/ie/delete/:id", authenticateUser, authorizeRoles("ie"), (req, res) => deleteLink(req, res, "ieCoding"));
router.put("/ie/update/:id", authenticateUser, authorizeRoles("ie"), (req, res) => updateLink(req, res, "ieCoding"));

router.post("/iste/addcode", authenticateUser, authorizeRoles("iste"), (req, res) => addLink(req, res, "isteCoding"));
router.get("/iste/getcode", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getLinks(req, res, "isteCoding"));
router.delete("/iste/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteLink(req, res, "isteCoding"));
router.put("/iste/update/:id", authenticateUser, authorizeRoles("iste"), (req, res) => updateLink(req, res, "isteCoding"));

module.exports = router;