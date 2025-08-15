const express = require('express');
const { submitQuiz } = require('../controllers/submissions');

// Include our middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file will be protected
router.use(protect);

router.route('/:quizId').post(submitQuiz);

module.exports = router;