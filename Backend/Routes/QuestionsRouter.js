const express = require('express');
const { addQuestion, getQuestions, deleteQuestion } = require('../controllers/QuestionsController');

const router = express.Router();

// Route to add a question (Admin side)
router.post('/add', addQuestion);

// Route to get all questions (Student side)
router.get('/get-questions', getQuestions);

// Route to delete a question (Admin side)
router.delete('/delete/:id', deleteQuestion);

module.exports = router;
