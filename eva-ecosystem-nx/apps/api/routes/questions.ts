const express = require('express');
const { createQuiz, getQuizzes, getQuizById } = require('../controllers/quizzes');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes in this file
router.use(protect);

router.route('/')
  .post(createQuiz)
  .get(getQuizzes);

router.route('/:id')
    .get(getQuizById);

module.exports = router;
