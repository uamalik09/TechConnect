const Preference = require("../Models/Preference");

// Submit preference
const submitPreference = async (req, res) => {
  try {
    const { name, rollNo, preferences } = req.body;

    const newPreference = new Preference({
      name,
      rollNo,
      preferences,
    });

    await newPreference.save();

    res.status(201).json({ message: "Preferences submitted successfully." });
  } catch (error) {
    console.error("Error submitting preferences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all preferences (for admin)
const getPreferences = async (req, res) => {
  try {
    const preferences = await Preference.find();
    res.status(200).json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { submitPreference, getPreferences };