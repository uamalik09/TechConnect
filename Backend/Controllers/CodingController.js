const coding= require("../Models/Coding"); // Import Link model

// Get all links
exports.getLinks = async (req, res, category) => {
  try {
    if (!coding[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const links = await coding[category].find(); // Use dynamic model
    res.status(200).json(links);
  } catch (error) {
    console.error("Error fetching links:", error); // Log for debugging
    res.status(500).json({ message: "Error fetching links", error });
  }
};

// Add a new link
exports.addLink = async (req, res, category) => {
  try {
    if (!coding[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const newLink = new coding[category]({ url });
    await newLink.save();

    res.status(201).json({ message: "Link added successfully", newLink });
  } catch (error) {
    console.error("Error adding link:", error);
    res.status(500).json({ message: "Error adding link", error });
  }
};


// Update a link
exports.updateLink = async (req, res, category) => {
  try {
    if (!coding[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const { id } = req.params;
    const { url } = req.body;

    const updatedLink = await coding[category].findByIdAndUpdate(id, { url }, { new: true });

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link updated successfully", updatedLink });
  } catch (error) {
    console.error("Error updating link:", error);
    res.status(500).json({ message: "Error updating link", error });
  }
};

exports.deleteLink = async (req, res, category) => {
  try {
    if (!coding[category]) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const { id } = req.params;
    const deletedLink = await coding[category].findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ message: "Error deleting link", error });
  }
};
