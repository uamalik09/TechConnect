const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        console.log("Incoming Request Headers:", req.headers);

        if (!req.headers.authorization) {
            return res.status(401).json({ message: "No auth token provided", success: false });
        }

        const token = req.headers.authorization.split(" ")[1];
        console.log("Extracted Token:", token);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decodedToken);

        if (decodedToken.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins only", success: false });
        }

        req.userData = decodedToken;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Authentication failed", success: false });
    }
};

module.exports = adminAuth;
