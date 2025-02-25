const UserModel = require('../Models/User');

const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body; // Email of the user to be promoted

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: "User is already an admin", success: false });
        }

        // Update role to admin
        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: "User promoted to admin", success: true });

    } catch (err) {
        console.error("Admin Promotion Error:", err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, "name email role");  // Include 'name' in the response
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { makeAdmin, getAllUsers };
