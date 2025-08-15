const Quiz = require('../models/Quiz');

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
// @access  Private
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