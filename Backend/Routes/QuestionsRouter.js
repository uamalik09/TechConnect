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

router.post("/iet/venture/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietventure"));
router.get("/iet/venture/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietventure"));
router.delete("/iet/venture/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietventure"));
router.get("/iet/venture/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietventure"));
router.post("/iet/venture/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietventure"));
router.patch("/iet/venture/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietventure")
);

router.post("/iet/inkheart/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietinkheart"));
router.get("/iet/inkheart/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietinkheart"));
router.delete("/iet/inkheart/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietinkheart"));
router.get("/iet/inkheart/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietinkheart"));
router.post("/iet/inkheart/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietinkheart"));
router.patch("/iet/inkheart/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietinkheart")
);

router.post("/iet/torsion/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "iettorsion"));
router.get("/iet/torsion/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "iettorsion"));
router.delete("/iet/torsion/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "iettorsion"));
router.get("/iet/torsion/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "iettorsion"));
router.post("/iet/torsion/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "iettorsion"));
router.patch("/iet/torsion/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "iettorsion")
);

router.post("/iet/media/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietmedia"));
router.get("/iet/media/get", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getQuestions(req, res, "ietmedia"));
router.delete("/iet/media/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietmedia"));
router.get("/iet/media/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietmedia"));
router.post("/iet/media/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietmedia"));
router.patch("/iet/media/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietmedia")
);

router.post("/ieee/compsoc/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeecompsoc"));
router.get("/ieee/compsoc/get", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getQuestions(req, res, "ieeecompsoc"));
router.delete("/ieee/compsoc/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeecompsoc"));
router.get("/ieee/compsoc/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeecompsoc"));
router.post("/ieee/compsoc/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeecompsoc"));
router.patch("/ieee/compsoc/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeecompsoc")
);

router.post("/ieee/piston/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeepiston"));
router.get("/ieee/piston/get", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getQuestions(req, res, "ieeepiston"));
router.delete("/ieee/piston/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeepiston"));
router.get("/ieee/piston/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeepiston"));
router.post("/ieee/piston/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeepiston"));
router.patch("/ieee/piston/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeepiston")
);

router.post("/ieee/diode/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeediode"));
router.get("/ieee/diode/get", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getQuestions(req, res, "ieeediode"));
router.delete("/ieee/diode/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeediode"));
router.get("/ieee/diode/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeediode"));
router.post("/ieee/diode/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeediode"));
router.patch("/ieee/diode/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeediode")
);
module.exports = router;