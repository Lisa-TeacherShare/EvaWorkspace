const express = require('express');
const { createSchool, getSchools } = require('../controllers/schools');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes in this file will be protected
router.use(protect);

router.route('/')
  .post(createSchool)
  .get(getSchools);

module.exports = router;