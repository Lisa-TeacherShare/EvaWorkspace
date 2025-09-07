const express = require('express');
const { generateQuestionsFromText } = require('../controllers/ai');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all AI routes
router.use(protect);

router.post('/generate-questions', generateQuestionsFromText);

module.exports = router;
