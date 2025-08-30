const { Quiz } = require('@eva-ecosystem-nx/data-access');
const { Question } = require('@eva-ecosystem-nx/data-access');

/**
 * @desc    Create a new quiz
 * @route   POST /api/quizzes
 * @access  Private (for Teachers/Admins)
 */
exports.createQuiz = async (req, res) => {
  try {
    const { title, subject, questions } = req.body;

    // Basic validation
    if (!title || !subject || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ success: false, message: 'Please provide title, subject, and an array of question IDs.' });
    }

    // Ensure all provided question IDs are valid
    const foundQuestions = await Question.find({ '_id': { $in: questions } });
    if (foundQuestions.length !== questions.length) {
      return res.status(400).json({ success: false, message: 'One or more question IDs are invalid.' });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Server error while creating quiz.' });
  }
};

/**
 * @desc    Get all quizzes
 * @route   GET /api/quizzes
 * @access  Private
 */
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('createdBy', 'name email')
      .populate('questions'); // This will populate the actual question documents

    res.status(200).json({ success: true, count: quizzes.length, data: quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching quizzes.' });
  }
};

/**
 * @desc    Get a single quiz by its ID
 * @route   GET /api/quizzes/:id
 * @access  Private
 */
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('questions');

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        res.status(200).json({ success: true, data: quiz });
    } catch (error) {
        console.error('Error fetching quiz by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

