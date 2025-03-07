// models/QuizSubmission.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizModel: {
        type: String,
        required: true
    },
    answers: [{
        questionId: Schema.Types.ObjectId,
        selectedAnswer: String
    }],
    score: {
        type: Number,
        default: 0
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuizSubmission', SubmissionSchema);