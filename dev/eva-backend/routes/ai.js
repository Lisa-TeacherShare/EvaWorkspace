const express = require('express');
const { 
  askQuestion, 
  generatePersonalizedQuiz, 
  generateQuizFromText 
} = require('../controllers/ai');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// --- Student (Premium) Routes ---
router.route('/ask').post(protect, authorize('premium'), askQuestion);
router.route('/personalized-quiz').post(protect, authorize('premium'), generatePersonalizedQuiz);

// --- Teacher & Admin Routes ---
router.route('/generate-quiz-from-text').post(protect, authorize('teacher', 'school_admin'), generateQuizFromText);

module.exports = router;