const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  college: String,
  status: {
    type: String,
    enum: ['placed', 'not_placed'],
  },
  scores: {
    dsa: Number,
    webd: Number,
    react: Number,
  },
  interviews: [{
    company: String,
    date: Date,
  }],
  // Add any other student-related fields
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
