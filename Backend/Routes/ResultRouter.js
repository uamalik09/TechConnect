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

module.exports = router;