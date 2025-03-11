const express = require("express");
const router = express.Router();
const { addQuestion, getQuestions, deleteQuestion, getquizsettings,updateQuizSettings, updateQuestionMarks } = require("../Controllers/QuestionsController");
const validateQuestion = require("../Middlewares/QuestionValidation");
const validateQuizSettings = require("../Middlewares/QuizSettings");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");

router.post("/iet/cipher/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietcipher"));
router.get("/iet/cipher/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietcipher"));
router.delete("/iet/cipher/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietcipher"));
router.get("/iet/cipher/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietcipher"));
router.post("/iet/cipher/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietcipher"));
router.patch("/iet/cipher/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietcipher"));

router.post("/iet/rovisp/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietrovisp"));
router.get("/iet/rovisp/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietrovisp"));
router.delete("/iet/rovisp/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietrovisp"));
router.get("/iet/rovisp/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietrovisp"));
router.post("/iet/rovisp/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietrovisp"));
router.patch("/iet/rovisp/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietrovisp")
);
module.exports = router;