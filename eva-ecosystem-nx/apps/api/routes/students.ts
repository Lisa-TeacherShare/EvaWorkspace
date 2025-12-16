import express from 'express';
import { getStudents, createStudent, updateStudentFees } from '../controllers/students';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id/fees')
    .put(updateStudentFees);

export default router;
