const express = require('express');
const { submitQuiz, getSubmissions } = require('../controllers/submission');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .post(submitQuiz)
  .get(getSubmissions);

module.exports = router;
