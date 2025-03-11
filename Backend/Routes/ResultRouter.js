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


module.exports = router;