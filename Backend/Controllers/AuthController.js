// const UserModel = require("../Models/User");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;
//         if (!confirmPassword || confirmPassword !== password) {
//             return res.status(400).json({
//                 message: "Bad request",
//                 errors: ["Passwords do not match"]
//             });
//         }
//         const user = await UserModel.findOne({ email });

//         if (user) {
//             return res.status(409).json({ message: "User already exist, you can login", success: false });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const userModel = new UserModel({ name, email, password: hashedPassword });
//         await userModel.save();

//         res.status(201).json({
//             message: "Signup successfully",
//             success: true
//         })

//     } catch (err) {
//         console.error("signup Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         })

//     }

// }

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });
//         const errorMsg = "Auth failed email or password is wrong";
//         if (!user) {
//             return res.status(403).json({ message: errorMsg, success: false });
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403).json({ message: errorMsg, success: false });
//         }
//         const jwtToken = jwt.sign({ email: user.email, _id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         )
//         res.status(200).json({
//             message: "Login success",
//             success: true,
//             jwtToken,
//             email,
//             name: user.name
//         })

//     } catch (err) {
//         console.error("Login Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         })

//     }

// }

// module.exports = {
//     signup, login
// }

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../Models/User');
// const { overallAdmins } = require('../Config/adminConfig');

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;

//         if (!confirmPassword || confirmPassword !== password) {
//             return res.status(400).json({
//                 message: "Passwords do not match",
//                 success: false
//             });
//         }

//         const userExists = await UserModel.findOne({ email });
//         if (userExists) {
//             return res.status(409).json({
//                 message: "User already exists, please log in",
//                 success: false
//             });
//         }

//         // Check if this email is in the predefined admin list
//         const role = overallAdmins.includes(email) ? 'admin' : 'user';

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new UserModel({ name, email, password: hashedPassword, role });
//         await newUser.save();

//         res.status(201).json({
//             message: `Signup successful. Role assigned: ${role}`,
//             success: true
//         });

//     } catch (err) {
//         console.error("Signup Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
//         }

//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
//         }

//         // Generate JWT Token
//         const jwtToken = jwt.sign(
//             { email: user.email, role: user.role },  // Include role in token
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             success: true,
//             jwtToken,
//             email: user.email,
//             name: user.name,
//             role: user.role  // Send role in response
//         });

//     } catch (err) {
//         console.error("Login Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         });
//     }
// };


// module.exports = { signup, login };

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../Models/User');
// const { overallAdmins } = require('../Config/adminConfig');

// const signup = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;

//         if (!password || password.length < 6) {
//             return res.status(400).json({
//                 message: "Password must be at least 6 characters long",
//                 success: false
//             });
//         }

//         if (!confirmPassword || confirmPassword !== password) {
//             return res.status(400).json({
//                 message: "Passwords do not match",
//                 success: false
//             });
//         }

//         const userExists = await UserModel.findOne({ email });
//         if (userExists) {
//             return res.status(409).json({
//                 message: "User already exists, please log in",
//                 success: false
//             });
//         }

//         // Assign role based on admin email list
//         const role = overallAdmins.includes(email) ? 'admin' : 'user';

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new UserModel({ name, email, password: hashedPassword, role });
//         await newUser.save();

//         res.status(201).json({
//             message: `Signup successful. Role assigned: ${role}`,
//             success: true,
//             user: {
//                 name: newUser.name,
//                 email: newUser.email,
//                 role: newUser.role
//             }
//         });

//     } catch (err) {
//         console.error("Signup Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
//         }

//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
//         }

//         // Generate JWT Token
//         const jwtToken = jwt.sign(
//             { userId: user._id, email: user.email, role: user.role },  // Include userId
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             success: true,
//             jwtToken,
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (err) {
//         console.error("Login Error:", err);
//         res.status(500).json({
//             message: "Internal Server error",
//             success: false
//         });
//     }
// };

// module.exports = { signup, login };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');
const { overallAdmins, ietAdmins, ieeeAdmins, acmAdmins, ieAdmins, isteAdmins } = require('../Config/adminConfig');

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false
            });
        }

        if (!confirmPassword || confirmPassword !== password) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            });
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                message: "User already exists, please log in",
                success: false
            });
        }

        // Assign role based on admin email lists
        let role = "user"; // Default role

        if (overallAdmins.includes(email)) role = "admin";
        else if (ietAdmins.includes(email)) role = "iet";
        else if (ieeeAdmins.includes(email)) role = "ieee";
        else if (acmAdmins.includes(email)) role = "acm";
        else if (ieAdmins.includes(email)) role = "ie";
        else if (isteAdmins.includes(email)) role = "iste";

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({
            message: `Signup successful. Role assigned: ${role}`,
            success: true,
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Internal Server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Auth failed: email or password is incorrect", success: false });
        }

        // Generate JWT Token
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },  // Include userId
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal Server error",
            success: false
        });
    }
};

module.exports = { signup, login };


