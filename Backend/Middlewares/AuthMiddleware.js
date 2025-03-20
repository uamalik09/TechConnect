const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contains { userId, email, role }
        next();
    } catch (error) {
        console.error("❌ Authentication Error:", error.message);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

// Middleware to check if the user has the required role
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. You don't have permission." });
        }
        next();
    };
};
const getUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated." });
    }
    res.json({ success: true, user: req.user });
};

module.exports = { authenticateUser, authorizeRoles ,getUser};
