const express = require('express');
const { askQuestion, generatePersonalizedQuiz } = require('../controllers/ai');

// Import our security middleware
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// This route is for the AI Homework Helper
router.route('/ask').post(protect, authorize('premium'), askQuestion);

// This route is for the Personalized Quiz Generator
router.route('/personalized-quiz').post(protect, authorize('premium'), generatePersonalizedQuiz);

module.exports = router;