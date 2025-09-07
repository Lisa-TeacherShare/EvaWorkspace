// Filename: apps/api/controllers/school.js
const School = require('@eva-ecosystem-nx/data-access'); // Adjust as needed

// @desc    Create a new school
// @route   POST /api/schools
// @access  Private (Admins)
exports.createSchool = async (req, res) => {
    const { name, address } = req.body;
    try {
        const school = await School.create({
            name,
            address,
            administrator: req.user.uid, // from auth middleware
        });
        res.status(201).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get school details
// @route   GET /api/schools/:id
// @access  Private
exports.getSchool = async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};