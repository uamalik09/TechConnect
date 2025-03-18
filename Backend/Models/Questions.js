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
  
    ieeecompsoc: mongoose.model("ieeecompsoc", QuestionSchema),
    ieeepiston: mongoose.model("ieeepiston", QuestionSchema),
    ieeediode: mongoose.model("ieeediode", QuestionSchema),
  
    ieCapital: mongoose.model("iecapital", QuestionSchema),
    ieCode: mongoose.model("iecode", QuestionSchema),
    ieGadget: mongoose.model("iegadget", QuestionSchema),
    ieRobotics: mongoose.model("ierobotics", QuestionSchema),
    ieGarage: mongoose.model("iegarage", QuestionSchema),
    ieTechtonic: mongoose.model("ietechtonic", QuestionSchema),
  
    acmsanganitra: mongoose.model("acmsanganitra", QuestionSchema),
    acmkaaryavarta: mongoose.model("acmkaaryavarta", QuestionSchema),
    acmvidyut: mongoose.model("acmvidyut", QuestionSchema),
    acmyantrika: mongoose.model("acmyantrika", QuestionSchema),
    acmsaahitya: mongoose.model("acmsaahitya", QuestionSchema),
    acmabhivyakta: mongoose.model("acmabhivyakta", QuestionSchema),
  
    istecrypt: mongoose.model("istecrypt", QuestionSchema),
    istecharge: mongoose.model("istecharge", QuestionSchema),
    istecatalyst: mongoose.model("istecatalyst", QuestionSchema),
    istechronicle: mongoose.model("istechronicle", QuestionSchema),
    isteclutch: mongoose.model("isteclutch", QuestionSchema),
    isteconcrete: mongoose.model("isteconcrete", QuestionSchema),
    istecredit: mongoose.model("istecredit", QuestionSchema),
    istecreate: mongoose.model("istecreate", QuestionSchema),
  };
  
  module.exports = models;
