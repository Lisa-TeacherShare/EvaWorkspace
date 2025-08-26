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
    type: [String], // Allows for multiple topics
    required: false
  },
  examType: {
    type: String,
    required: [true, 'Please specify the exam type'],
    enum: ['WAEC', 'NECO', 'JAMB', 'BECE', 'Common Entrance', 'School Exam', 'Other'],
  },
  year: {
    type: Number,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: [true, 'Please add the correct answer text']
  },
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
    ref: 'User',
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