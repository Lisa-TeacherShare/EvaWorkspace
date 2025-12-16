const express = require('express');
const { generateQuestions, generateLessonPlan } = require('../controllers/ai');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all AI routes
router.use(protect);

router.post('/generate-questions', generateQuestions);
router.post('/lesson-plan', generateLessonPlan);

module.exports = router;
