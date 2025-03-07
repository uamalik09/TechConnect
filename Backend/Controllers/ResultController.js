// controllers/SubmissionController.js
const QuizSubmission = require('../Models/Result');
const models = require('../Models/Questions');

const submitQuiz = async (req, res, modelName) => {
    try {
        const { answers } = req.body;
        const userId = req.user.id;
        
        // Check if user has already submitted this quiz
        const existingSubmission = await QuizSubmission.findOne({ 
            userId: userId,
            quizModel: modelName
        });
        
        if (existingSubmission) {
            return res.status(400).json({ message: 'You have already submitted this quiz' });
        }
        
        // Calculate score
        const SelectedModel = models[modelName];
        const questions = await SelectedModel.find();
        let score = 0;
        
        const formattedAnswers = answers.map((answer, index) => {
            const question = questions[index];
            if (question && answer === question.correctAnswer) {
                score++;
            }
            return {
                questionId: question._id,
                selectedAnswer: answer
            };
        });
        
        // Create new submission
        const newSubmission = new QuizSubmission({
            userId: userId,
            quizModel: modelName,
            answers: formattedAnswers,
            score: score
        });
        
        await newSubmission.save();
        
        res.status(201).json({ 
            message: 'Quiz submitted successfully',
            score: score,
            totalQuestions: questions.length
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ message: 'Error submitting quiz' });
    }
};

const getSubmissions = async (req, res, modelName) => {
    try {
        const submissions = await QuizSubmission.find({ quizModel: modelName })
            .populate('userId', 'name email');
        
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions' });
    }
};

module.exports = { submitQuiz, getSubmissions };