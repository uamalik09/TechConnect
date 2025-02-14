const { adminSignup, adminLogin } = require('../Controllers/AdminController');
const { adminSignupValidation, adminLoginValidation } = require('../Middlewares/AdminValidation');

const router = require('express').Router();

router.post('/adminlogin', adminLoginValidation, adminLogin);
router.post('/adminsignup', adminSignupValidation, adminSignup );

module.exports = router;
