const express = require('express');
const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

// Include our middleware
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes below will use the 'protect' middleware
router.use(protect);

router.route('/')
    .get(getQuestions)
    .post(createQuestion);

router.route('/:id')
    .put(updateQuestion)
    .delete(deleteQuestion);

module.exports = router;