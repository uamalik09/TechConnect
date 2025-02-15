const QuestionModel = require("../Models/Questions");

// Add a new question (Admin side)
const addQuestion = async (req, res) => {
    try {
        const newQuestion = new QuestionModel(req.body);
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error adding question" });
    }
};

// Get all questions (Student side)
const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
};

// Delete a question (Admin side)
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await QuestionModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting question" });
    }
};

module.exports = { addQuestion, getQuestions, deleteQuestion };
