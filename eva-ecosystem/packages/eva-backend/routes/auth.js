const express = require('express');
const { register, login, getMe } = require('../controllers/auth'); // Add getMe
const { protect } = require('../middleware/auth'); // Import the protect middleware

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // Add the new protected route

module.exports = router;