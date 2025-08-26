const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboard');

// Import our security middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

// This route is protected, so only logged-in users can see the leaderboard
router.route('/').get(protect, getLeaderboard);

module.exports = router;