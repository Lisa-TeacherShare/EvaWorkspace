const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the quiz'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  class: {
    type: String, // e.g., 'JSS1', 'SS2', etc.
    required: [true, 'Please specify the class for this quiz'],
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question', // This creates a link to the Question model
    },
  ],
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Please set a time limit for the quiz'],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // The teacher who created the quiz
    required: true,
  },
  published: {
    type: Boolean,
    default: false, // Becomes true when the teacher makes it available to students
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);