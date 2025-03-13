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

router.get('/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), getQuizStatus);
router.get('/iet/cipher/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ietcipher';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iet/rovisp/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ietrovisp';
        getSpecificQuizStatus(req, res);
    }
);
router.get('/iet/venture/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ietventure';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iet/torsion/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'iettorsion';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iet/inkheart/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ietinkheart';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iet/media/quiz-status', authenticateUser, authorizeRoles('iet', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ietmedia';
        getSpecificQuizStatus(req, res);
    }
);

module.exports = router;