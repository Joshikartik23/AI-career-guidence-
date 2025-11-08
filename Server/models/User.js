const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Using name as a simple unique key
  education: String,
  skills: [String],
  interests: [String],
});

module.exports = mongoose.model('User', userSchema);