const express = require('express');
const { updateTestStatus, getTestStatus } = require('../Controllers/TestStatusController');
const { validateTestSettings } = require("../Middlewares/TestStatusValidation");

const router = express.Router();

router.post('/update-test-status', validateTestSettings, updateTestStatus);
router.get('/get-test-status', getTestStatus);

module.exports = router;
