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

const getquizsettings = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const latestQuestion = await SelectedModel.findOne().sort({_id: -1});
        if (!latestQuestion) {
            return res.status(404).json({ message: 'No quiz settings found' });
        }
        
        res.json({
            quizTimeLimitSeconds: latestQuestion.quizTimeLimitSeconds,
            quizStartTime: latestQuestion.quizStartTime,
            quizEndTime: latestQuestion.quizEndTime
        });
    } catch (error) {
        console.error("Error fetching quiz settings:", error); // Add this for debugging
        res.status(500).json({ message: error.message });
    }
};
const updateQuizSettings = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const { quizTimeLimitSeconds, quizStartTime, quizEndTime } = req.body;
        
        // Validate required fields
        if (!quizTimeLimitSeconds || !quizStartTime || !quizEndTime) {
            return res.status(400).json({ message: 'Missing required quiz settings' });
        }
        
        // Update all existing questions with the new settings
        await SelectedModel.updateMany({}, { 
            $set: { 
                quizTimeLimitSeconds,
                quizStartTime,
                quizEndTime
            } 
        });
        
        res.status(200).json({ message: "Quiz settings updated successfully!" });
    } catch (error) {
        console.error("Error updating quiz settings:", error);
        res.status(500).json({ 
            error: "Error updating quiz settings", 
            details: error.message 
        });
    }
};
module.exports = { addQuestion, getQuestions, deleteQuestion ,getquizsettings,updateQuizSettings};