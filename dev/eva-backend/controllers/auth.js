// eva-backend/controllers/auth.js
// ... (keep the User model import and other functions)

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    // We no longer expect accountType from the form
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Create user and automatically set accountType to 'premium'
    const user = await User.create({
      fullName,
      email,
      password,
      accountType: 'premium', 
    });

    // Create token
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

// ... (keep your login and getMe functions)