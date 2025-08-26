const Submission = require('../models/Submission');
const User = require('../models/User');

// @desc    Get the global leaderboard
// @route   GET /api/leaderboard
// @access  Private
exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Submission.aggregate([
      // Stage 1: Group all submissions by the student who made them
      {
        $group: {
          _id: '$student', // Group by the 'student' field
          totalScore: { $sum: '$score' }, // Sum up the 'score' for each student
        },
      },
      // Stage 2: Sort the results by totalScore in descending order (highest first)
      {
        $sort: {
          totalScore: -1,
        },
      },
      // Stage 3: Limit the results to the top 100 students
      {
        $limit: 100,
      },
      // Stage 4: Look up the user's details (like their name and photo) from the 'users' collection
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'studentDetails',
        },
      },
      // Stage 5: Reshape the data to be cleaner for the frontend
      {
        $project: {
          _id: 0, // Exclude the default _id field
          studentId: '$_id',
          totalScore: 1, // Include the totalScore
          fullName: { $arrayElemAt: ['$studentDetails.fullName', 0] }, // Get the fullName from the looked-up details
          photoUrl: { $arrayElemAt: ['$studentDetails.photoUrl', 0] }, // Get the photoUrl
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};