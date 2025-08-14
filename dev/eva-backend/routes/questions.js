const express = require('express');
const { createQuestion } = require('../controllers/questions');

// Include our middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

// Any route defined below this will be protected
router.route('/').post(protect, createQuestion);

module.exports = router;