const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  company: String,
  status: {
    type: String,
    enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
