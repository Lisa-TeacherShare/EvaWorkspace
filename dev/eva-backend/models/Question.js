const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Please add the question text'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  topic: {
    type: String,
    required: [true, 'Please add a topic'],
  },
  examType: {
    type: String,
    required: [true, 'Please specify the exam type (e.g., WAEC, JAMB)'],
    enum: ['WAEC', 'NECO', 'JAMB', 'BECE', 'Common Entrance', 'Other'],
  },
  year: {
    type: Number,
  },
  options: [
    {
      text: { type: String, required: true },
      // isCorrect is not strictly needed if we store the correct answer's index
    },
  ],
  correctAnswerIndex: {
    type: Number,
    required: [true, 'Please specify the index of the correct answer'],
  },
  imageUrl: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Links to the teacher who created it
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'ready_for_cbt', 'archived'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);