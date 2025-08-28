const express = require('express');
const { getStudentAnalytics } = require('../controllers/analytics');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/student/:studentId', getStudentAnalytics);

module.exports = router;
