const TestStatus = require('../Models/TestStatus'); // Import TestStatus model

// Update test status (Admin side)
const updateTestStatus = async (req, res) => {
    try {
        const { startTime, endTime, access } = req.body;

        // Find existing test status and update or create a new one
        let testStatus = await TestStatus.findOne();
        if (testStatus) {
            testStatus.startTime = startTime;
            testStatus.endTime = endTime;
            testStatus.access = access;
        } else {
            testStatus = new TestStatus({ startTime, endTime, access });
        }

        await testStatus.save();
        res.status(200).json({ message: "Test settings updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error updating test settings" });
    }
};

// Get test status (For both admin and students)
const getTestStatus = async (req, res) => {
    try {
        const testStatus = await TestStatus.findOne();
        if (!testStatus) {
            return res.status(404).json({ error: "Test settings not found" });
        }
        res.status(200).json(testStatus);
    } catch (error) {
        res.status(500).json({ error: "Error fetching test settings" });
    }
};

module.exports = { updateTestStatus, getTestStatus };
