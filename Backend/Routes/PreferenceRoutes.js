// PreferenceRoutes.js
const express = require('express');
const router = express.Router();
const { submitPreference, getPreferences } = require('../Controllers/PreferenceController');

// Route to submit preferences
router.post('/submit', submitPreference);

// Route to get all preferences (for admin)
router.get('/all', getPreferences);

module.exports = router;