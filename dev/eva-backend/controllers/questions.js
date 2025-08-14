const Question = require('../models/Question');
const User = require('../models/User');

// @desc    Create new question
// @route   POST /api/questions
// @access  Private (Teachers/Admins)
exports.createQuestion = async (req, res, next) => {
  try {
    // Add the logged-in user's ID to the request body
    req.body.createdBy = req.user.id;

    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};