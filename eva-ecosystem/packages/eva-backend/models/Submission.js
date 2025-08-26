const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.ObjectId, ref: 'Question' },
      selectedAnswerIndex: { type: Number },
    },
  ],
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', SubmissionSchema);