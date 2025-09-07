// Filename: apps/api/routes/questions.ts

import express from 'express';
import { createQuestion } from '../controllers/questions';
import { verifyToken, authorize } from '../middleware/auth';

const router = express.Router();

// This route is now protected.
// 1. verifyToken checks if the user is logged in.
// 2. authorize('Admin', 'Teacher') checks if their role is one of the allowed roles.
// If both pass, the createQuestion controller function is called.
router.route('/').post(verifyToken, authorize('Admin', 'Teacher'), createQuestion);

// We will add the GET route here later
// router.route('/').get(verifyToken, getQuestions);

export default router;