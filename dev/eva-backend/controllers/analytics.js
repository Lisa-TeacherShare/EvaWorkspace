const Submission = require('../models/Submission');
const Quiz = require('../models/Quiz');
const mongoose = require('mongoose');

// @desc    Get performance analytics for a specific quiz
// @route   GET /api/analytics/quiz/:quizId
// @access  Private (Teachers/Admins)
exports.getQuizAnalytics = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        // --- Get all submissions for this quiz ---
        const submissions = await Submission.find({ quiz: quizId })
            .populate({
                path: 'student',
                select: 'fullName'
            });

        if (submissions.length === 0) {
            return res.status(200).json({ success: true, message: 'No submissions yet for this quiz.' });
        }

        // --- Calculate basic stats ---
        const totalSubmissions = submissions.length;
        const averageScore = submissions.reduce((acc, sub) => acc + (sub.score / sub.totalQuestions), 0) / totalSubmissions;

        // --- Find the most difficult topics (this is a more advanced query) ---
        // We will add this logic later to keep this step focused.

        res.status(200).json({
            success: true,
            data: {
                totalSubmissions,
                averageScore: (averageScore * 100).toFixed(2) + '%', // Format as percentage
                studentScores: submissions.map(s => ({
                    studentName: s.student.fullName,
                    score: s.score,
                    totalQuestions: s.totalQuestions
                }))
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all submissions for a specific student
// @route   GET /api/analytics/student/:studentId
// @access  Private (Teachers/Admins)
exports.getStudentAnalytics = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;

        const studentSubmissions = await Submission.find({ student: studentId })
            .populate({
                path: 'quiz',
                select: 'title subject'
            })
            .sort({ submittedAt: -1 });

        res.status(200).json({
            success: true,
            data: studentSubmissions
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};