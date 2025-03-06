const validateTestSettings = (req, res, next) => {
    const { startTime, endTime, access } = req.body;

    // Check if all fields exist
    if (!startTime || !endTime || typeof access !== "boolean") {
        return res.status(400).json({ error: "Start time, end time, and access status are required." });
    }

    // Validate Date Format
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: "Invalid date format." });
    }

    // Ensure start time is before end time
    if (startDate >= endDate) {
        return res.status(400).json({ error: "Start time must be before end time." });
    }

    // Ensure start time is not in the past
    if (startDate < new Date()) {
        return res.status(400).json({ error: "Start time cannot be in the past." });
    }

    next(); // Pass the request to the controller if validation passes
};

module.exports = { validateTestSettings };
