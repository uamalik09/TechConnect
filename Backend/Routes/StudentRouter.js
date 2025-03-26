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

router.get('/acm/sanganitra/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/sanganitra/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.get('/acm/kaaryavarta/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/kaaryavarta/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.get('/acm/saahitya/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/saahitya/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.get('/acm/abhivyakta/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/abhivyakta/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.get('/acm/yantrika/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/yantrika/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.get('/acm/vidyut/all', authenticateUser, authorizeRoles('acm'), getAllStudents);
router.get('/acm/vidyut/:rollNumber', authenticateUser, authorizeRoles('acm'), getStudentByRollNumber);

router.post('/acm/sanganitra/register', registerStudent);
router.post('/acm/kaaryavarta/register', registerStudent);
router.post('/acm/yantrika/register', registerStudent);
router.post('/acm/abhivyakta/register', registerStudent);
router.post('/acm/saahitya/register', registerStudent);
router.post('/acm/vidyut/register', registerStudent);


router.post('/iste/catalyst/register', registerStudent);
router.post('/iste/charge/register', registerStudent);
router.post('/iste/concrete/register', registerStudent);
router.post('/iste/create/register', registerStudent);
router.post('/iste/clutch/register', registerStudent);
router.post('/iste/chronicle/register', registerStudent);
router.post('/iste/credit/register', registerStudent);
router.post('/iste/crypt/register', registerStudent);

router.get('/iste/catalyst/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/catalyst/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/charge/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/charge/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/clutch/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/clutch/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/create/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/create/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/concrete/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/concrete/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/chronicle/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/chronicle/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/credit/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/credit/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.get('/iste/crypt/all', authenticateUser, authorizeRoles('iste'), getAllStudents);
router.get('/iste/crypt/:rollNumber', authenticateUser, authorizeRoles('iste'), getStudentByRollNumber);

router.post('/ie/capital/register', registerStudent);
router.post('/ie/code/register', registerStudent);
router.post('/ie/robotics/register', registerStudent);
router.post('/ie/tectonic/register', registerStudent);
router.post('/ie/garage/register', registerStudent);
router.post('/ie/gadget/register', registerStudent);
router.post('/ie/script/register', registerStudent);

router.get('/ie/capital/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/capital/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/code/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/code/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/garage/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/garage/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/tectonic/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/tectonic/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/robotics/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/robotics/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/gadget/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/gadget/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

router.get('/ie/script/all', authenticateUser, authorizeRoles('ie'), getAllStudents);
router.get('/ie/script/:rollNumber', authenticateUser, authorizeRoles('ie'), getStudentByRollNumber);

module.exports = router;