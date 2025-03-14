// routes/StudentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent, getAllStudents, getStudentByRollNumber } = require('../Controllers/StudentController');
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware');

// Public route for student registration
router.post('/iet/cipher/register', registerStudent);
router.post('/iet/rovisp/register', registerStudent);
router.post('/iet/torsion/register', registerStudent);
router.post('/iet/media/register', registerStudent);
router.post('/iet/inkheart/register', registerStudent);
router.post('/iet/venture/register', registerStudent);

// Admin routes - protected
router.get('/iet/cipher/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/cipher/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.get('/iet/rovisp/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/rovisp/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.get('/iet/inkheart/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/inkheart/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.get('/iet/media/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/media/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.get('/iet/torsion/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/torsion/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.get('/iet/venture/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/iet/venture/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

router.post('/ieee/compsoc/register', registerStudent);
router.post('/ieee/diode/register', registerStudent);
router.post('/ieee/piston/register', registerStudent);
router.get('/ieee/compsoc/all', authenticateUser, authorizeRoles('ieee'), getAllStudents);
router.get('/ieee/compsoc/:rollNumber', authenticateUser, authorizeRoles('ieee'), getStudentByRollNumber);

router.get('/ieee/diode/all', authenticateUser, authorizeRoles('ieee'), getAllStudents);
router.get('/ieee/diode/:rollNumber', authenticateUser, authorizeRoles('ieee'), getStudentByRollNumber);

router.get('/ieee/piston/all', authenticateUser, authorizeRoles('ieee'), getAllStudents);
router.get('/ieee/piston/:rollNumber', authenticateUser, authorizeRoles('ieee'), getStudentByRollNumber);


module.exports = router;