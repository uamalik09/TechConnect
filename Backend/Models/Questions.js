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
    marks: {
        type: Number,
        required: true,
        default: 1
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
    ietcipher: mongoose.model("ietcipher", QuestionSchema),
    ietrovisp: mongoose.model("ietrovisp", QuestionSchema),
    ietventure: mongoose.model("ietventure", QuestionSchema),
    ietinkheart: mongoose.model("ietinkheart", QuestionSchema),
    ietmedia: mongoose.model("ietmedia", QuestionSchema),
    iettorsion: mongoose.model("iettorsion", QuestionSchema),
  
    ieeeCompsoc: mongoose.model("ieeecompsoc", QuestionSchema),
    ieeePiston: mongoose.model("ieeepiston", QuestionSchema),
    ieeeDiode: mongoose.model("ieeediode", QuestionSchema),
  
    ieCapital: mongoose.model("iecapital", QuestionSchema),
    ieCode: mongoose.model("iecode", QuestionSchema),
    ieGadget: mongoose.model("iegadget", QuestionSchema),
    ieRobotics: mongoose.model("ierobotics", QuestionSchema),
    ieGarage: mongoose.model("iegarage", QuestionSchema),
    ieTechtonic: mongoose.model("ietechtonic", QuestionSchema),
  
    acmSanganitra: mongoose.model("acmsanganitra", QuestionSchema),
    acmKaaryavarta: mongoose.model("acmkaaryavarta", QuestionSchema),
    acmVidyut: mongoose.model("acmvidyut", QuestionSchema),
    acmYantrika: mongoose.model("acmyantrika", QuestionSchema),
    acmSaahitya: mongoose.model("acmsaahitya", QuestionSchema),
    acmAbhivyakta: mongoose.model("acmabhivyakta", QuestionSchema),
  
    isteCrypt: mongoose.model("istecrypt", QuestionSchema),
    isteCharge: mongoose.model("istecharge", QuestionSchema),
    isteCatalyst: mongoose.model("istecatalyst", QuestionSchema),
    isteChronicle: mongoose.model("istechronicle", QuestionSchema),
  };
  
  module.exports = models;
