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

router.get('/ieee/compsoc/quiz-status', authenticateUser, authorizeRoles('ieee', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ieeecompsoc';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/ieee/diode/quiz-status', authenticateUser, authorizeRoles('ieee', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ieeediode';
        getSpecificQuizStatus(req, res);
    }
);
router.get('/ieee/piston/quiz-status', authenticateUser, authorizeRoles('ieee', 'user'), 
    (req, res) => {
        req.params.quizModel = 'ieeepiston';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/acm/sanganitra/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmsanganitra';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/acm/kaaryavarta/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmkaaryavarta';
        getSpecificQuizStatus(req, res);
    }
);
router.get('/acm/vidyut/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmvidyut';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/acm/yantrika/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmyantrika';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/acm/saahitya/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmsaahitya';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/acm/abhivyakta/quiz-status', authenticateUser, authorizeRoles('acm', 'user'), 
    (req, res) => {
        req.params.quizModel = 'acmabhivyakta';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/catalyst/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istecatalyst';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/charge/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istecharge';
        getSpecificQuizStatus(req, res);
    }
);
router.get('/iste/chronicle/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istechronicle';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/concrete/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'isteconcrete';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/clutch/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'isteclutch';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/create/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istecreate';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/credit/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istecredit';
        getSpecificQuizStatus(req, res);
    }
);

router.get('/iste/crypt/quiz-status', authenticateUser, authorizeRoles('iste', 'user'), 
    (req, res) => {
        req.params.quizModel = 'istecrypt';
        getSpecificQuizStatus(req, res);
    }
);


module.exports = router;