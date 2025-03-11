// routes/StudentRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent, getAllStudents, getStudentByRollNumber } = require('../Controllers/StudentController');
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware');

// Public route for student registration
router.post('/register', registerStudent);

// Admin routes - protected
router.get('/all', authenticateUser, authorizeRoles('iet'), getAllStudents);
router.get('/:rollNumber', authenticateUser, authorizeRoles('iet'), getStudentByRollNumber);

module.exports = router;