// const { signup, login } = require('../Controllers/AuthController');
// const { adminSignup, adminLogin } = require('../Controllers/AdminController');
// const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
// const { adminSignupValidation, adminLoginValidation } = require('../Middlewares/AdminValidation');

// const router = require('express').Router();

// // Authentication Routes
// router.post('/login', loginValidation, login);
// router.post('/signup', signupValidation, signup);
// router.post('/adminlogin', adminLoginValidation, adminLogin);
// router.post('/adminsignup', adminSignupValidation, adminSignup);

// module.exports = router;

const express = require("express");
const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = express.Router();

router.post("/signup", signupValidation,signup);
router.post("/login", loginValidation,login);

module.exports = router;

