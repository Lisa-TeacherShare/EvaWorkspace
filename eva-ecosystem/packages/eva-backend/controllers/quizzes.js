// eva-backend/controllers/quizzes.js
const Quiz = require('../models/Quiz');
const User = require('../models/User');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Private
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().populate({
        path: 'createdBy',
        select: 'fullName'
    });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get a single quiz for a student to take
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate({
      path: 'questions',
      select: 'questionText options subject topic imageUrl',
    });

    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Teacher/Admin)
exports.createQuiz = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Teacher/Admin)
exports.updateQuiz = async (req, res, next) => {
    try {
        let quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ success: false, error: 'Quiz not found' });
        }
        quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: quiz });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Teacher/Admin)
exports.deleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ success: false, error: 'Quiz not found' });
        }
        await quiz.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};