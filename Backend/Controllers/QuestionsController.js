const models = require("../Models/Questions");  
const QuestionModel = require("../Models/Questions");  

const addQuestion = async (req, res, modelName) => {
    try {
        const SelectedModel = models[modelName] || QuestionModel;
        const newQuestion = new SelectedModel(req.body);
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully!" });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ 
            error: "Error adding question", 
            details: error.message 
        });
    }
};

const getQuestions = async (req, res, modelName) => {
    try {
        const SelectedModel = models[modelName] || QuestionModel;
        const questions = await SelectedModel.find();
        const totalMarks = questions.reduce((sum, question) => sum + (question.marks || 1), 0);
        
        res.status(200).json({
            questions,
            totalMarks
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
};
const deleteQuestion = async (req, res, modelName) => {
    try {
        const SelectedModel = models[modelName] || QuestionModel;
        
        const { id } = req.params;
        await SelectedModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting question" });
    }
};

const updateQuestionMarks = async (req, res, modelName) => {
    try {
        const SelectedModel = models[modelName] || QuestionModel;
        const { id } = req.params;
        const { marks } = req.body;
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
        const SelectedModel = models[modelName] || QuestionModel;
        const questions = await SelectedModel.find();
        const totalMarks = questions.reduce((sum, question) => sum + (question.marks || 1), 0);
        const latestQuestion = await SelectedModel.findOne().sort({_id: -1});
        if (!latestQuestion) {
            return res.status(200).json({
                quizTimeLimitSeconds: 600, 
                quizStartTime: new Date(), 
                quizEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
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
        const SelectedModel = models[modelName] || QuestionModel;
        
        const { quizTimeLimitSeconds, quizStartTime, quizEndTime } = req.body;
        
        if (!quizTimeLimitSeconds || !quizStartTime || !quizEndTime) {
            return res.status(400).json({ message: 'Missing required quiz settings' });
        }
        
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