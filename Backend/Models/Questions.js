const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
