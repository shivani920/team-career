const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  company: String,
  date: Date,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
