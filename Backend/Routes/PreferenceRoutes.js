// PreferenceRoutes.js
const express = require('express');
const router = express.Router();
const { submitPreference, getPreferences } = require('../Controllers/PreferenceController');
const {authenticateUser,authorizeRoles}=require('../Middlewares/AuthMiddleware')

// Route to submit preferences
router.post('/submit',authenticateUser, submitPreference);

// Route to get all preferences (for admin)
router.get('/all', getPreferences,authorizeRoles("iet,ieee,iste,acm,ie"));

module.exports = router;