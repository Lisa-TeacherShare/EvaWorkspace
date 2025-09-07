const express = require('express');
const router = express.Router();
const { registerUser, getMe, getUsers } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

// Public route for registering a new user
router.post('/register', registerUser);

// A protected route to get the current user's profile
router.get('/me', protect, getMe);

// A protected route to get all users
router.get('/users', protect, getUsers);

module.exports = router;