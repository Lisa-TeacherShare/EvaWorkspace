const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// @desc    Submit answers for a quiz and get it graded
// @route   POST /api/submissions/:quizId
// @access  Private (Students)
exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body; // The student's answers from the frontend
    const quizId = req.params.quizId;
    const studentId = req.user.id;

    // --- Step 1: Fetch the quiz and its correct answers from the database ---
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    // --- Step 2: Loop through the student's answers and compare them to the correct answers ---
    for (const studentAnswer of answers) {
      // Find the corresponding question in the quiz's question list
      const question = quiz.questions.find(
        (q) => q._id.toString() === studentAnswer.questionId
      );

      // If the question exists and the answer is correct, increment the score
      if (question && question.correctAnswerIndex === studentAnswer.selectedAnswerIndex) {
        score++;
      }
    }

    // --- Step 3: Save the submission details to the database ---
    const submission = await Submission.create({
      quiz: quizId,
      student: studentId,
      answers,
      score,
      totalQuestions,
    });

    // --- Step 4: Send the final score back to the student ---
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        score,
        totalQuestions,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};