const express = require("express");
const router = express.Router();
const { addTalk, getTalks, deleteTalk } = require("../Controllers/TalkController");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");

// IET TALK
router.post("/iet/addtalk", authenticateUser, authorizeRoles("iet"), (req, res) => addTalk(req, res, "ietTalk"));
router.get("/iet/gettalks", authenticateUser, (req, res) => getTalks(req, res, "ietTalk"));
router.delete("/iet/deletetalk/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteTalk(req, res, "ietTalk"));

// IEEE TALK
router.post("/ieee/addtalk", authenticateUser, authorizeRoles("ieee"), (req, res) => addTalk(req, res, "ieeeTalk"));
router.get("/ieee/gettalks", authenticateUser, (req, res) => getTalks(req, res, "ieeeTalk"));
router.delete("/ieee/deletetalk/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteTalk(req, res, "ieeeTalk"));

// ACM TALK
router.post("/acm/addtalk", authenticateUser, authorizeRoles("acm"), (req, res) => addTalk(req, res, "acmTalk"));
router.get("/acm/gettalks", authenticateUser, (req, res) => getTalks(req, res, "acmTalk"));
router.delete("/acm/deletetalk/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteTalk(req, res, "acmTalk"));

// IE TALK
router.post("/ie/addtalk", authenticateUser, authorizeRoles("ie"), (req, res) => addTalk(req, res, "ieTalk"));
router.get("/ie/gettalks", authenticateUser, (req, res) => getTalks(req, res, "ieTalk"));
router.delete("/ie/deletetalk/:id", authenticateUser, authorizeRoles("ie"), (req, res) => deleteTalk(req, res, "ieTalk"));

// ISTE TALK
router.post("/iste/addtalk", authenticateUser, authorizeRoles("iste"), (req, res) => addTalk(req, res, "isteTalk"));
router.get("/iste/gettalks", authenticateUser, (req, res) => getTalks(req, res, "isteTalk"));
router.delete("/iste/deletetalk/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteTalk(req, res, "isteTalk"));

module.exports = router;
