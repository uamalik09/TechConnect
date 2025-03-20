// routes/SubmissionRoutes.js
const express = require('express');
const router = express.Router();
const { submitQuiz, getAllSubmissions,updateQualificationStatus } = require('../Controllers/ResultController');
const validateSubmission = require('../Middlewares/ResultValidation');
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware');


router.post('/iet/cipher/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ietcipher'));
router.get('/iet/cipher/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'ietcipher'));
router.patch('/iet/cipher/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'ietcipher'));

router.post('/iet/rovisp/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ietrovisp'));
router.get('/iet/rovisp/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'ietrovisp'));
router.patch('/iet/rovisp/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'ietrovisp'));

router.post('/iet/venture/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ietventure'));
router.get('/iet/venture/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'ietventure'));
router.patch('/iet/venture/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'ietventure'));

router.post('/iet/torsion/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'iettorsion'));
router.get('/iet/torsion/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'iettorsion'));
router.patch('/iet/torsion/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'iettorsion'));

router.post('/iet/inkheart/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ietinkheart'));
router.get('/iet/inkheart/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'ietinkheart'));
router.patch('/iet/inkheart/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'ietinkheart'));

router.post('/iet/media/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ietmedia'));
router.get('/iet/media/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getAllSubmissions(req, res, 'ietmedia'));
router.patch('/iet/media/submissions/:submissionId/status', authenticateUser, authorizeRoles('iet'), (req, res)=>updateQualificationStatus(req, res, 'ietmedia'));

router.post('/ieee/compsoc/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ieeecompsoc'));
router.get('/ieee/compsoc/submissions', authenticateUser, authorizeRoles('ieee'), (req, res) => 
    getAllSubmissions(req, res, 'ieeecompsoc'));
router.patch('/ieee/compsoc/submissions/:submissionId/status', authenticateUser, authorizeRoles('ieee'), (req, res)=>updateQualificationStatus(req, res, 'ieeecompsoc'));

router.post('/ieee/diode/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ieeediode'));
router.get('/ieee/diode/submissions', authenticateUser, authorizeRoles('ieee'), (req, res) => 
    getAllSubmissions(req, res, 'ieeediode'));
router.patch('/ieee/diode/submissions/:submissionId/status', authenticateUser, authorizeRoles('ieee'), (req, res)=>updateQualificationStatus(req, res, 'ieeediode'));

router.post('/ieee/piston/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'ieeepiston'));
router.get('/ieee/piston/submissions', authenticateUser, authorizeRoles('ieee'), (req, res) => 
    getAllSubmissions(req, res, 'ieeepiston'));
router.patch('/ieee/piston/submissions/:submissionId/status', authenticateUser, authorizeRoles('ieee'), (req, res)=>updateQualificationStatus(req, res, 'ieeepiston'));

router.post('/acm/sanganitra/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmsanganitra'));
router.get('/acm/sanganitra/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmsanganitra'));
router.patch('/acm/sanganitra/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmsanganitra'));

router.post('/acm/kaaryavarta/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmkaaryavarta'));
router.get('/acm/kaaryavarta/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmkaaryavarta'));
router.patch('/acm/kaaryavarta/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmkaaryavarta'));

router.post('/acm/vidyut/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmvidyut'));
router.get('/acm/vidyut/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmvidyut'));
router.patch('/acm/vidyut/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmvidyut'));

router.post('/acm/yantrika/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmyantrika'));
router.get('/acm/yantrika/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmyantrika'));
router.patch('/acm/yantrika/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmyantrika'));

router.post('/acm/saahitya/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmsaahitya'));
router.get('/acm/saahitya/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmsaahitya'));
router.patch('/acm/saahitya/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmsaahitya'));

router.post('/acm/abhivyakta/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'acmabhivyakta'));
router.get('/acm/abhivyakta/submissions', authenticateUser, authorizeRoles('acm'), (req, res) => 
    getAllSubmissions(req, res, 'acmabhivyakta'));
router.patch('/acm/abhivyakta/submissions/:submissionId/status', authenticateUser, authorizeRoles('acm'), (req, res)=>updateQualificationStatus(req, res, 'acmabhivyakta'));

router.post('/iste/catalyst/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istecatalyst'));
router.get('/iste/catalyst/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istecatalyst'));
router.patch('/iste/catalyst/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istecatalyst'));

router.post('/iste/charge/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istecharge'));
router.get('/iste/charge/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istecharge'));
router.patch('/iste/charge/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istecharge'));

router.post('/iste/chronicle/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istechronicle'));
router.get('/iste/chronicle/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istechronicle'));
router.patch('/iste/chronicle/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istechronicle'));

router.post('/iste/concrete/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'isteconcrete'));
router.get('/iste/concrete/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'isteconcrete'));
router.patch('/iste/concrete/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'isteconcrete'));

router.post('/iste/clutch/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'isteclutch'));
router.get('/iste/clutch/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'isteclutch'));
router.patch('/iste/clutch/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'isteclutch'));

router.post('/iste/create/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istecreate'));
router.get('/iste/create/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istecreate'));
router.patch('/iste/create/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istecreate'));

router.post('/iste/credit/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istecredit'));
router.get('/iste/credit/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istecredit'));
router.patch('/iste/credit/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istecredit'));

router.post('/iste/crypt/submit', authenticateUser,validateSubmission, (req, res) => 
    submitQuiz(req, res, 'istecrypt'));
router.get('/iste/crypt/submissions', authenticateUser, authorizeRoles('iste'), (req, res) => 
    getAllSubmissions(req, res, 'istecrypt'));
router.patch('/iste/crypt/submissions/:submissionId/status', authenticateUser, authorizeRoles('iste'), (req, res)=>updateQualificationStatus(req, res, 'istecrypt'));



module.exports = router;