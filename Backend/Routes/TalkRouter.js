const express = require("express");
const router = express.Router();
const {addTalk, getTalks, deleteTalk} = require('../Controllers/TalkController');

// // Add a new talk
// router.post("/addtalk", addTalk);

// // Get all talks
// router.get("/gettalks", getTalks);

// // Delete a talk
// router.delete("/deletetalk/:id", deleteTalk);

//IET TALK
router.post("/iet/addtalk", (req, res) => addTalk(req, res, "ietTalk"));
router.get("/iet/gettalks", (req, res) => getTalks(req, res, "ietTalk"));
router.delete("/iet/deletetalk/:id", (req, res) => deleteTalk(req, res, "ietTalk"));

//IEEE TALK
router.post("/ieee/addtalk", (req, res) => addTalk(req, res, "ieeeTalk"));
router.get("/ieee/gettalks", (req, res) => getTalks(req, res, "ieeeTalk"));
router.delete("/ieee/deletetalk/:id", (req, res) => deleteTalk(req, res, "ieeeTalk"));


//ACM TALK
router.post("/acm/addtalk", (req, res) => addTalk(req, res, "acmTalk"));
router.get("/acm/gettalks", (req, res) => getTalks(req, res, "acmTalk"));
router.delete("/acm/deletetalk/:id", (req, res) => deleteTalk(req, res, "acmTalk"));


//IE TALK
router.post("/ie/addtalk", (req, res) => addTalk(req, res, "ieTalk"));
router.get("/ie/gettalks", (req, res) => getTalks(req, res, "ieTalk"));
router.delete("/ie/deletetalk/:id", (req, res) => deleteTalk(req, res, "ieTalk"));


//ISTE TALK
router.post("/iste/addtalk", (req, res) => addTalk(req, res, "isteTalk"));
router.get("/iste/gettalks", (req, res) => getTalks(req, res, "isteTalk"));
router.delete("/iste/deletetalk/:id", (req, res) => deleteTalk(req, res, "isteTalk"));



module.exports = router;
