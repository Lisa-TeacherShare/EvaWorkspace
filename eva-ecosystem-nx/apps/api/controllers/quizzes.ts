// Filename: apps/api/controllers/quizzes.js
const Quiz = require('@eva-ecosystem-nx/data-access'); // Adjust path as needed

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (Teachers, Admins)
exports.createQuiz = async (req, res) => {
    const { title, subject, questions, duration } = req.body;
    try {
        const quiz = await Quiz.create({
            title,
            subject,
            questions, // Array of Question ObjectIds
            duration,
            createdBy: req.user.uid, // From auth middleware
        });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single quiz details
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};