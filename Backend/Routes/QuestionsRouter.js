const express = require("express");
const router = express.Router();
const { addQuestion, getQuestions, deleteQuestion, getquizsettings,updateQuizSettings, updateQuestionMarks } = require("../Controllers/QuestionsController");
const validateQuestion = require("../Middlewares/QuestionValidation");
const validateQuizSettings = require("../Middlewares/QuizSettings");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");
router.get("/:club/:sig/get/student", authenticateUser, authorizeRoles("user"), (req, res) => {
    const {club,sig}=req.params;
    getQuestions(req, res,`${club}${sig}`);
});
router.post("/iet/cipher/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietcipher"));
router.get("/iet/cipher/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "ietcipher"));
router.delete("/iet/cipher/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietcipher"));
router.get("/iet/cipher/settings", authenticateUser, authorizeRoles("iet"), (req, res) => getquizsettings(req, res, "ietcipher"));
router.post("/iet/cipher/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietcipher"));
router.patch("/iet/cipher/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietcipher"));

router.post("/iet/rovisp/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietrovisp"));
router.get("/iet/rovisp/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "ietrovisp"));
router.delete("/iet/rovisp/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietrovisp"));
router.get("/iet/rovisp/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietrovisp"));
router.post("/iet/rovisp/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietrovisp"));
router.patch("/iet/rovisp/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietrovisp")
);

router.post("/iet/venture/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietventure"));
router.get("/iet/venture/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "ietventure"));
router.delete("/iet/venture/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietventure"));
router.get("/iet/venture/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietventure"));
router.post("/iet/venture/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietventure"));
router.patch("/iet/venture/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietventure")
);

router.post("/iet/inkheart/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietinkheart"));
router.get("/iet/inkheart/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "ietinkheart"));
router.delete("/iet/inkheart/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietinkheart"));
router.get("/iet/inkheart/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietinkheart"));
router.post("/iet/inkheart/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietinkheart"));
router.patch("/iet/inkheart/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietinkheart")
);

router.post("/iet/torsion/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "iettorsion"));
router.get("/iet/torsion/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "iettorsion"));
router.delete("/iet/torsion/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "iettorsion"));
router.get("/iet/torsion/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "iettorsion"));
router.post("/iet/torsion/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "iettorsion"));
router.patch("/iet/torsion/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "iettorsion")
);

router.post("/iet/media/add", authenticateUser, authorizeRoles("iet"), validateQuestion, (req, res) => addQuestion(req, res, "ietmedia"));
router.get("/iet/media/get", authenticateUser, authorizeRoles("iet"), (req, res) => getQuestions(req, res, "ietmedia"));
router.delete("/iet/media/delete/:id", authenticateUser, authorizeRoles("iet"), (req, res) => deleteQuestion(req, res, "ietmedia"));
router.get("/iet/media/settings", authenticateUser, authorizeRoles("iet", "user"), (req, res) => getquizsettings(req, res, "ietmedia"));
router.post("/iet/media/settings/update", authenticateUser, authorizeRoles("iet"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ietmedia"));
router.patch("/iet/media/updateMarks/:id", authenticateUser, authorizeRoles("iet"), (req, res) => 
    updateQuestionMarks(req, res, "ietmedia")
);

router.post("/ieee/compsoc/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeecompsoc"));
router.get("/ieee/compsoc/get", authenticateUser, authorizeRoles("ieee"), (req, res) => getQuestions(req, res, "ieeecompsoc"));
router.delete("/ieee/compsoc/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeecompsoc"));
router.get("/ieee/compsoc/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeecompsoc"));
router.post("/ieee/compsoc/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeecompsoc"));
router.patch("/ieee/compsoc/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeecompsoc")
);

router.post("/ieee/piston/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeepiston"));
router.get("/ieee/piston/get", authenticateUser, authorizeRoles("ieee"), (req, res) => getQuestions(req, res, "ieeepiston"));
router.delete("/ieee/piston/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeepiston"));
router.get("/ieee/piston/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeepiston"));
router.post("/ieee/piston/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeepiston"));
router.patch("/ieee/piston/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeepiston")
);

router.post("/ieee/diode/add", authenticateUser, authorizeRoles("ieee"), validateQuestion, (req, res) => addQuestion(req, res, "ieeediode"));
router.get("/ieee/diode/get", authenticateUser, authorizeRoles("ieee"), (req, res) => getQuestions(req, res, "ieeediode"));
router.delete("/ieee/diode/delete/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => deleteQuestion(req, res, "ieeediode"));
router.get("/ieee/diode/settings", authenticateUser, authorizeRoles("ieee", "user"), (req, res) => getquizsettings(req, res, "ieeediode"));
router.post("/ieee/diode/settings/update", authenticateUser, authorizeRoles("ieee"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "ieeediode"));
router.patch("/ieee/diode/updateMarks/:id", authenticateUser, authorizeRoles("ieee"), (req, res) => 
    updateQuestionMarks(req, res, "ieeediode")
);

router.post("/acm/sanganitra/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmsanganitra"));
router.get("/acm/sanganitra/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmsanganitra"));
router.delete("/acm/sanganitra/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmsanganitra"));
router.get("/acm/sanganitra/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmsanganitra"));
router.post("/acm/sanganitra/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmsanganitra"));
router.patch("/acm/sanganitra/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmsanganitra"));

router.post("/acm/kaaryavarta/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmkaaryavarta"));
router.get("/acm/kaaryavarta/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmkaaryavarta"));
router.delete("/acm/kaaryavarta/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmkaaryavarta"));
router.get("/acm/kaaryavarta/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmkaaryavarta"));
router.post("/acm/kaaryavarta/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmkaaryavarta"));
router.patch("/acm/kaaryavarta/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmkaaryavarta")
);

router.post("/acm/vidyut/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmvidyut"));
router.get("/acm/vidyut/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmvidyut"));
router.delete("/acm/vidyut/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmvidyut"));
router.get("/acm/vidyut/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmvidyut"));
router.post("/acm/vidyut/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmvidyut"));
router.patch("/acm/vidyut/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmvidyut")
);

router.post("/acm/yantrika/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmyantrika"));
router.get("/acm/yantrika/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmyantrika"));
router.delete("/acm/yantrika/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmyantrika"));
router.get("/acm/yantrika/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmyantrika"));
router.post("/acm/yantrika/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmyantrika"));
router.patch("/acm/yantrika/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmyantrika")
);

router.post("/acm/saahitya/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmsaahitya"));
router.get("/acm/saahitya/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmsaahitya"));
router.delete("/acm/saahitya/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmsaahitya"));
router.get("/acm/saahitya/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmsaahitya"));
router.post("/acm/saahitya/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmsaahitya"));
router.patch("/acm/saahitya/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmsaahitya")
);

router.post("/acm/abhivyakta/add", authenticateUser, authorizeRoles("acm"), validateQuestion, (req, res) => addQuestion(req, res, "acmabhivyakta"));
router.get("/acm/abhivyakta/get", authenticateUser, authorizeRoles("acm"), (req, res) => getQuestions(req, res, "acmabhivyakta"));
router.delete("/acm/abhivyakta/delete/:id", authenticateUser, authorizeRoles("acm"), (req, res) => deleteQuestion(req, res, "acmabhivyakta"));
router.get("/acm/abhivyakta/settings", authenticateUser, authorizeRoles("acm", "user"), (req, res) => getquizsettings(req, res, "acmabhivyakta"));
router.post("/acm/abhivyakta/settings/update", authenticateUser, authorizeRoles("acm"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "acmabhivyakta"));
router.patch("/acm/abhivyakta/updateMarks/:id", authenticateUser, authorizeRoles("acm"), (req, res) => 
    updateQuestionMarks(req, res, "acmabhivyakta")
);

router.post("/iste/catalyst/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istecatalyst"));
router.get("/iste/catalyst/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istecatalyst"));
router.delete("/iste/catalyst/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istecatalyst"));
router.get("/iste/catalyst/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istecatalyst"));
router.post("/iste/catalyst/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istecatalyst"));
router.patch("/iste/catalyst/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istecatalyst"));

router.post("/iste/charge/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istecharge"));
router.get("/iste/charge/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istecharge"));
router.delete("/iste/charge/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istecharge"));
router.get("/iste/charge/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istecharge"));
router.post("/iste/charge/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istecharge"));
router.patch("/iste/charge/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istecharge")
);

router.post("/iste/chronicle/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istechronicle"));
router.get("/iste/chronicle/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istechronicle"));
router.delete("/iste/chronicle/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istechronicle"));
router.get("/iste/chronicle/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istechronicle"));
router.post("/iste/chronicle/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istechronicle"));
router.patch("/iste/chronicle/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istechronicle")
);

router.post("/iste/clutch/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "isteclutch"));
router.get("/iste/clutch/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "isteclutch"));
router.delete("/iste/clutch/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "isteclutch"));
router.get("/iste/clutch/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "isteclutch"));
router.post("/iste/clutch/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "isteclutch"));
router.patch("/iste/clutch/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "isteclutch")
);

router.post("/iste/concrete/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "isteconcrete"));
router.get("/iste/concrete/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "isteconcrete"));
router.delete("/iste/concrete/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "isteconcrete"));
router.get("/iste/concrete/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "isteconcrete"));
router.post("/iste/concrete/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "isteconcrete"));
router.patch("/iste/concrete/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "isteconcrete")
);

router.post("/iste/create/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istecreate"));
router.get("/iste/create/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istecreate"));
router.delete("/iste/create/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istecreate"));
router.get("/iste/create/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istecreate"));
router.post("/iste/create/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istecreate"));
router.patch("/iste/create/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istecreate")
);

router.post("/iste/credit/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istecredit"));
router.get("/iste/credit/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istecredit"));
router.delete("/iste/credit/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istecredit"));
router.get("/iste/credit/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istecredit"));
router.post("/iste/credit/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istecredit"));
router.patch("/iste/credit/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istecredit")
);

router.post("/iste/crypt/add", authenticateUser, authorizeRoles("iste"), validateQuestion, (req, res) => addQuestion(req, res, "istecrypt"));
router.get("/iste/crypt/get", authenticateUser, authorizeRoles("iste"), (req, res) => getQuestions(req, res, "istecrypt"));
router.delete("/iste/crypt/delete/:id", authenticateUser, authorizeRoles("iste"), (req, res) => deleteQuestion(req, res, "istecrypt"));
router.get("/iste/crypt/settings", authenticateUser, authorizeRoles("iste", "user"), (req, res) => getquizsettings(req, res, "istecrypt"));
router.post("/iste/crypt/settings/update", authenticateUser, authorizeRoles("iste"), validateQuizSettings, (req, res) => updateQuizSettings(req, res, "istecrypt"));
router.patch("/iste/crypt/updateMarks/:id", authenticateUser, authorizeRoles("iste"), (req, res) => 
    updateQuestionMarks(req, res, "istecrypt")
);
module.exports = router;