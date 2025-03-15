const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  preferences: Object,
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;