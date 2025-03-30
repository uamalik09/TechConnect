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
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User'); // Adjust path if needed

const { signup, login } = require("../Controllers/AuthController");
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const {authenticateUser,getUser}= require('../Middlewares/AuthMiddleware');
const router = express.Router();

router.post("/signup", signupValidation,signup);
router.post("/login", loginValidation,login);
router.get("/user", authenticateUser, getUser);
router.get('/verify', async (req, res) => {
    try {
        console.log("🔹 Received request to /verify");
        console.log("🔹 Headers:", req.headers);

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No valid Authorization header found");
            return res.status(401).json({ message: "No token provided", success: false });
        }

        const token = authHeader.split(" ")[1];
        

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       

        const user = await UserModel.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found", success: false });
        }

        console.log("✅ Token valid for user:", user.email);
        res.status(200).json({ success: true, valid: true, user });

    } catch (error) {
        console.error("❌ Token verification failed:", error);
        res.status(401).json({ message: "Invalid or expired token", success: false });
    }
});

module.exports = router;
