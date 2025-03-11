const express = require('express');
const router = express.Router();
const { 
    getQuizStatus, 
    getSpecificQuizStatus 
} = require('../Controllers/QuizStatusController');
const { validateQuizModel } = require('../Middlewares/QuizStatusValidation');
const { 
    authenticateUser, 
    authorizeRoles 
} = require('../Middlewares/AuthMiddleware');

// Get status for all quiz submissions
router.get('/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), getQuizStatus);

// Get status for specific quiz models
// Option 1: If you want to keep the current URL structure, add '/status' prefix to your Express app
router.get('/iet/cipher/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        // Manually adding the quizModel parameter
        req.params.quizModel = 'ietcipher';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iet/rovisp/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        // Manually adding the quizModel parameter
        req.params.quizModel = 'ietrovisp';
        getSpecificQuizStatus(req, res);
    }
);

module.exports = router;