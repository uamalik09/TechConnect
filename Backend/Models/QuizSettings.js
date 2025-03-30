const mongoose = require('mongoose');

const quizSettingsSchema = new mongoose.Schema({
    quizTimeLimitSeconds: { type: Number, required: true },
    quizStartTime: { type: Date, required: true },
    quizEndTime: { type: Date, required: true }
});

const QuizSettings = mongoose.model('QuizSettings', quizSettingsSchema);
module.exports = QuizSettings;
