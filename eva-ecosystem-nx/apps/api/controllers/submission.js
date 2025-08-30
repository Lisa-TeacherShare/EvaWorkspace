const { Submission } = require('@eva-ecosystem-nx/data-access');
const { Quiz } = require('@eva-ecosystem-nx/data-access');
const { Question } = require('@eva-ecosystem-nx/data-access');

/**
 * @desc    Submit answers for a quiz
 * @route   POST /api/submissions
 * @access  Private (for Students)
 */
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const studentId = req.user._id;

    // 1. Fetch the quiz and its questions' correct answers
    const quiz = await Quiz.findById(quizId).populate({
      path: 'questions',
      select: 'correctAnswer' // Only select the correctAnswer field
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let score = 0;
    const detailedResults = [];

    // 2. Calculate the score
    quiz.questions.forEach(question => {
      const questionId = question._id.toString();
      const studentAnswer = answers[questionId];
      const isCorrect = studentAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      detailedResults.push({
        question: questionId,
        studentAnswer: studentAnswer || null, // Store null if not answered
        isCorrect
      });
    });

    // 3. Create the submission record
    const submission = await Submission.create({
      quiz: quizId,
      student: studentId,
      answers: detailedResults,
      score: score,
      totalQuestions: quiz.questions.length
    });

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully.',
      data: submission
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting quiz.' });
  }
};

/**
 * @desc    Get all submissions for a user or a quiz
 * @route   GET /api/submissions
 * @access  Private
 */
exports.getSubmissions = async (req, res) => {
    try {
        const { quizId, studentId } = req.query;
        const filter = {};

        if (quizId) {
            filter.quiz = quizId;
        }
        // If the user is a student, only show their own submissions unless they are an admin/teacher
        if (req.user.kind === 'Student') {
            filter.student = req.user._id;
        } else if (studentId) {
            filter.student = studentId;
        }

        const submissions = await Submission.find(filter)
            .populate('quiz', 'title subject')
            .populate('student', 'name email');

        res.status(200).json({ success: true, count: submissions.length, data: submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

