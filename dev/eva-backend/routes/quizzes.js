const express = require('express');
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizzes');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// --- TEMPORARY TEST ROUTE ---
// We are adding this simple route to test if the file is loading.
router.get('/test', (req, res) => {
  res.send('Quiz route is working!');
});
// --- END OF TEST ROUTE ---

router
  .route('/')
  .get(protect, getQuizzes)
  .post(protect, authorize('teacher', 'school_admin'), createQuiz);

router
  .route('/:id')
  .get(protect, getQuiz)
  .put(protect, authorize('teacher', 'school_admin'), updateQuiz)
  .delete(protect, authorize('teacher', 'school_admin'), deleteQuiz);

module.exports = router;