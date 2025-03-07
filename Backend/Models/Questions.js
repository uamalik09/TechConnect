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
    quizTimeLimitSeconds:{
        type:Number,
        default:600,
    },
    quizStartTime:{
        type:Date,
        required:true,
    },
    quizEndTime:{
        type:Date,
        required:true,
    },
});

const models = {
    ietCipher: mongoose.model("ietCipher", QuestionSchema),
    ietVenture: mongoose.model("ietVenture", QuestionSchema),
    ietROVISP: mongoose.model("ietROVISP", QuestionSchema),
    ietInheart: mongoose.model("ietInheart", QuestionSchema),
    ietMedia: mongoose.model("ietMedia", QuestionSchema),
    ietTorsion: mongoose.model("ietTorsion", QuestionSchema),
  
    ieeeCompsoc: mongoose.model("ieeeCompsoc", QuestionSchema),
    ieeePiston: mongoose.model("ieeePiston", QuestionSchema),
    ieeeDiode: mongoose.model("ieeeDiode", QuestionSchema),
  
    ieCapital: mongoose.model("ieCapital", QuestionSchema),
    ieCode: mongoose.model("ieCode", QuestionSchema),
    ieGadget: mongoose.model("ieGadget", QuestionSchema),
    ieRobotics: mongoose.model("ieRobotics", QuestionSchema),
    ieGarage: mongoose.model("ieGarage", QuestionSchema),
    ieTechtonic: mongoose.model("ieTechtonic", QuestionSchema),
  
    acmSanganitra: mongoose.model("acmSanganitra", QuestionSchema),
    acmKaaryavarta: mongoose.model("acmKaaryavarta", QuestionSchema),
    acmVidyut: mongoose.model("acmVidyut", QuestionSchema),
    acmYantrika: mongoose.model("acmYantrika", QuestionSchema),
    acmSaahitya: mongoose.model("acmSaahitya", QuestionSchema),
    acmAbhivyakta: mongoose.model("acmAbhivyakta", QuestionSchema),
  
    isteCrypt: mongoose.model("isteCrypt", QuestionSchema),
    isteCharge: mongoose.model("isteCharge", QuestionSchema),
    isteCatalyst: mongoose.model("isteCatalyst", QuestionSchema),
    isteChronicle: mongoose.model("isteChronicle", QuestionSchema),
  };
  
  module.exports = models;
