const { User, Admin, Teacher, Student } = require('../models/User');
const admin = require('../config/firebase');

/**
 * @desc    Register a new user in Firebase and MongoDB
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.registerUser = async (req, res) => {
  const { email, password, name, role, ...otherDetails } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please provide email, password, and role.' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    const userData = {
      firebaseId: userRecord.uid,
      email,
      name,
      ...otherDetails
    };

    let newUser;
    switch (role) {
      case 'Admin':
        newUser = await Admin.create(userData);
        break;
      case 'Teacher':
        newUser = await Teacher.create(userData);
        break;
      case 'Student':
        newUser = await Student.create(userData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid user role specified.' });
    }

    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });

  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(400).json({ message: error.message || 'User registration failed' });
  }
};

/**
 * @desc    Get the profile of the currently logged-in user
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
  res.status(200).json(req.user);
};

/**
 * @desc    Get all users from the database
 * @route   GET /api/auth/users
 * @access  Private (should be restricted to Admins)
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; // <-- This closing brace was likely the missing piece.