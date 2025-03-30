const AdminModel = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSignup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!confirmPassword || confirmPassword !== password) {
            return res.status(400).json({
                message: "Bad request",
                errors: ["Passwords do not match"],
            });
        }

        const admin = await AdminModel.findOne({ email });

        if (admin) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const adminModel = new AdminModel({ name, email, password: hashedPassword });
        await adminModel.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        const errorMsg = "Auth failed: email or password is incorrect";

        if (!admin) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, admin.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: admin.email, _id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: admin.name,
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

module.exports = { adminSignup, adminLogin };
