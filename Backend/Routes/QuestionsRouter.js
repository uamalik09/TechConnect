const express = require("express");
const router = express.Router();
const { addQuestion, getQuestions, deleteQuestion, getquizsettings,updateQuizSettings } = require("../Controllers/QuestionsController");
const validateQuestion = require("../Middlewares/QuestionValidation");
const validateQuizSettings = require("../Middlewares/QuizSettings");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");

router.post("/iet/cipher/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietCipher"));
router.get("/iet/cipher/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietCipher"));
router.delete("/iet/cipher/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietCipher"));
router.get("/iet/cipher/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietCipher"));
router.post("/iet/cipher/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietCipher"));
module.exports = router;