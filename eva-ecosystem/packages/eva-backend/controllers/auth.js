const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    // UPDATED: accountType is no longer expected from the form
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // UPDATED: Create user and automatically set accountType to 'premium'
    const user = await User.create({
      fullName,
      email,
      password,
      accountType: 'premium', 
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({ success: false, error: message });
    }
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
    
  } catch (err) {
     res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};