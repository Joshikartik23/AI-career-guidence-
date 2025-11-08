const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  careerName: { type: String, required: true },
  description: String,
  detailedDesc: String,
  requiredSkills: [String],
  salary: String,
  growth: String,
  icon: String,
  color: String,
  courses: [{
    title: String,
    platform: String,
    link: String,
    duration: String
  }]
});

module.exports = mongoose.model('Career', careerSchema);