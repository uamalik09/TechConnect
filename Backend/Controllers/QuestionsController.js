const models = require("../Models/Questions");  // Import all models
const QuestionModel = require("../Models/Questions");  // Keep this import

// Add a new question (Admin side)
const addQuestion = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const newQuestion = new SelectedModel(req.body);
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully!" });
    } catch (error) {
        console.error("Error adding question:", error);  // Log the full error for debugging
        res.status(500).json({ 
            error: "Error adding question", 
            details: error.message 
        });
    }
};

// Get all questions (Student side)
const getQuestions = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const questions = await SelectedModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
};

// Delete a question (Admin side)
const deleteQuestion = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const { id } = req.params;
        await SelectedModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting question" });
    }
};

module.exports = { addQuestion, getQuestions, deleteQuestion };