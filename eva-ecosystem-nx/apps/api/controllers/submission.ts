// Filename: apps/api/controllers/submission.js
const Submission = require('@eva-ecosystem-nx/data-access'); // Adjust as needed

// @desc    Submit a quiz
// @route   POST /api/submissions
// @access  Private (Students)
exports.submitQuiz = async (req, res) => {
    const { quizId, answers } = req.body;
    
    // In a real app, you would calculate the score here by comparing
    // the submitted answers with the correct answers from the Question documents.
    const calculatedScore = 0; // Placeholder for score calculation logic
    const totalQuestions = answers.length;

    try {
        const submission = await Submission.create({
            quiz: quizId,
            student: req.user.uid,
            answers,
            score: calculatedScore,
            totalQuestions,
        });
        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};