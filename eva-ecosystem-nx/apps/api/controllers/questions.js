const { Question } = require('@eva-ecosystem-nx/data-access');
const { School } = require('@eva-ecosystem-nx/data-access'); // We might need this later for authorization

/**
 * @desc    Create a new question
 * @route   POST /api/questions
 * @access  Private (e.g., only Teachers can create questions)
 */
exports.createQuestion = async (req, res) => {
  try {
    // Add the creator's ID to the question data
    req.body.createdBy = req.user._id;

    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all questions
 * @route   GET /api/questions
 * @access  Private
 */
exports.getQuestions = async (req, res) => {
  try {
    // We can add filtering later (e.g., by subject, topic, etc.)
    const questions = await Question.find().populate('createdBy', 'name email');
    res.status(200).json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

