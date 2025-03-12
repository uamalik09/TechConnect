// Models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  // Add club and SIG information
  registrations: [{
    club: {
      type: String,
      required: true,
      uppercase: true
    },
    sig: {
      type: String,
      required: true,
      uppercase: true
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;