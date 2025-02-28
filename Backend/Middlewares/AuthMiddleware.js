const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization"); // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Contains { id, role }
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

// Middleware to check if user has required role
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. You don't have permission." });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };
