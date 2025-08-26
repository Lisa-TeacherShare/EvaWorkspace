const express = require('express');
const { getQuizAnalytics, getStudentAnalytics } = require('../controllers/analytics');

// Import our security middleware
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes in this file and restrict to teachers/admins
router.use(protect, authorize('teacher', 'school_admin'));

router.route('/quiz/:quizId').get(getQuizAnalytics);
router.route('/student/:studentId').get(getStudentAnalytics);

module.exports = router;