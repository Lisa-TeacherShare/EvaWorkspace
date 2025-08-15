const express = require('express');
const { createQuiz, getQuiz } = require('../controllers/quizzes');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes in this file
router.use(protect);

router.route('/')
    .post(createQuiz);

router.route('/:id')
    .get(getQuiz);

module.exports = router;