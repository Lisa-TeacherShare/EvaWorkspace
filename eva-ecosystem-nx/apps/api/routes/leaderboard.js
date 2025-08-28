const express = require('express');
const { getQuizLeaderboard } = require('../controllers/leaderboard');
const { protect } = require('../middleware/auth');

const router = express.Router();

// You might make this public later, but for now, let's protect it.
router.use(protect);

router.get('/quiz/:quizId', getQuizLeaderboard);

module.exports = router;
