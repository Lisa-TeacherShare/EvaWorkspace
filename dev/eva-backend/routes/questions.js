const express = require('express');
const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

// Import both middleware functions
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes in this file (user must be logged in)
router.use(protect);

// Now, specify which roles can access which routes
router.route('/')
    .get(getQuestions)
    .post(authorize('teacher', 'school_admin'), createQuestion);

router.route('/:id')
    .put(authorize('teacher', 'school_admin'), updateQuestion)
    .delete(authorize('teacher', 'school_admin'), deleteQuestion);

module.exports = router;