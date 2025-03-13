const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    rollNumber: {
        type: String,
        ref: 'Student',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    quizModel: {
        type: String,
        required: true
    },
    answers: [{
        questionId: Schema.Types.ObjectId,
        selectedOption: String 
    }],
    score: {
        type: Number,
        default: 0
    },
    additionalMarks: {
        type: Number,
        default: 0
    },
    totalScore: {
        type: Number,
        default: 0
    },
    qualifiedRound2: {
        type: Boolean,
        default: false
    },
    qualifiedRound3: {
        type: Boolean,
        default: false
    },
    recruited: {
        type: Boolean,
        default: false
    },
    interviewSlot: {
        type: Date,
        required:true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QuizSubmission', SubmissionSchema);