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
  clubPreferences: {
    type: [String],
    default: ['IET', 'IEEE', 'IE', 'ISTE', 'ACM'],
    validate: {
      validator: function(preferences) {
        const requiredClubs = ['IET', 'IEEE', 'IE', 'ISTE', 'ACM'];
        
        // Check if all required clubs are included
        return requiredClubs.every(club => preferences.includes(club)) && 
               preferences.length === 5;
      },
      message: 'Club preferences must include all five required clubs: IET, IEEE, IE, ISTE, and ACM'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);