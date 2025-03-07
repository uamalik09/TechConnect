// routes/SubmissionRoutes.js
const express = require('express');
const router = express.Router();
const { submitQuiz, getSubmissions } = require('../Controllers/ResultController');
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware');


router.post('/iet/cipher/submit', authenticateUser, (req, res) => 
    submitQuiz(req, res, 'ietCipher'));


router.get('/iet/cipher/submissions', authenticateUser, authorizeRoles('iet'), (req, res) => 
    getSubmissions(req, res, 'ietCipher'));

module.exports = router;