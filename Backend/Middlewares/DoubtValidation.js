const Doubt = require("../Models/Doubt");

// Middleware to check if the doubt exists
const doesDoubtExist = async (req, res, next) => {
    try {
        const doubt = await Doubt.findById(req.params.doubtId);
        if (!doubt) {
            return res.status(404).json({ message: "Doubt not found" });
        }
        req.doubt = doubt; // Attach doubt to request object
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { doesDoubtExist };
