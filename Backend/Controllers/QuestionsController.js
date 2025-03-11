const models = require("../Models/Questions");  // Import all models
const QuestionModel = require("../Models/Questions");  // Keep this import

// Add a new question (Admin side)
const addQuestion = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        // If marks is not provided, it will use the default value (1) from the schema
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
        
        // Calculate total marks available
        const totalMarks = questions.reduce((sum, question) => sum + (question.marks || 1), 0);
        
        res.status(200).json({
            questions,
            totalMarks
        });
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

// Update marks for a question (Admin side)
const updateQuestionMarks = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        const { id } = req.params;
        const { marks } = req.body;
        
        // Validate marks
        if (!marks || !Number.isInteger(marks) || marks < 1 || marks > 100) {
            return res.status(400).json({ error: "Marks must be an integer between 1 and 100" });
        }
        
        const updatedQuestion = await SelectedModel.findByIdAndUpdate(
            id,
            { marks },
            { new: true }
        );
        
        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }
        
        res.status(200).json({ 
            message: "Marks updated successfully!",
            question: updatedQuestion
        });
    } catch (error) {
        console.error("Error updating marks:", error);
        res.status(500).json({ 
            error: "Error updating marks", 
            details: error.message 
        });
    }
};

const getquizsettings = async (req, res, modelName) => {
    try {
        // Select the correct model based on the modelName
        const SelectedModel = models[modelName] || QuestionModel;
        
        // Find all questions to calculate total marks
        const questions = await SelectedModel.find();
        const totalMarks = questions.reduce((sum, question) => sum + (question.marks || 1), 0);
        
        // Find the latest question for time settings
        const latestQuestion = await SelectedModel.findOne().sort({_id: -1});
        
        // If no questions exist, return default settings
        if (!latestQuestion) {
            return res.status(200).json({
                quizTimeLimitSeconds: 600, // Default 10 minutes
                quizStartTime: new Date(), // Current time
                quizEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
                totalMarks: 0,
                totalQuestions: 0
            });
        }
        
        res.json({
            quizTimeLimitSeconds: latestQuestion.quizTimeLimitSeconds,
            quizStartTime: latestQuestion.quizStartTime,
            quizEndTime: latestQuestion.quizEndTime,
            totalMarks: totalMarks,
            totalQuestions: questions.length
        });
    } catch (error) {
        console.error("Error fetching quiz settings:", error);
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

module.exports = { 
    addQuestion, 
    getQuestions, 
    deleteQuestion, 
    getquizsettings, 
    updateQuizSettings, 
    updateQuestionMarks 
};