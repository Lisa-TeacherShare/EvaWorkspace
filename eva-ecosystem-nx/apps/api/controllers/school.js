const { School } = require('@eva-ecosystem-nx/data-access');
const { User } = require('../models/User');

/**
 * @desc    Create a new school
 * @route   POST /api/schools
 * @access  Private (will be restricted to Admins later)
 */
exports.createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;

    // req.user is attached by our `protect` middleware
    const administrator = req.user._id;

    const school = await School.create({
      name,
      address,
      administrator
    });

    res.status(201).json({
      success: true,
      data: school
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all schools
 * @route   GET /api/schools
 * @access  Private
 */
exports.getSchools = async (req, res) => {
  try {
    const schools = await School.find().populate('administrator', 'name email');
    res.status(200).json({ success: true, data: schools });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
