// Filename: apps/api/controllers/students.ts
import { Request, Response } from 'express';
import { StudentModel } from '@eva-ecosystem-nx/data-access';
import { calculateFeeStatus } from '@eva-ecosystem-nx/feature';

// @desc    Get all students
// @route   GET /api/students
// @access  Private
export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).json(students);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Private
export const createStudent = async (req: Request, res: Response) => {
    try {
        const { _id, firstName, lastName, educationLevel, school_id, term_bill, qr_code_string } = req.body;

        const student = await StudentModel.create({
            _id, // Using custom ID as per requirement
            name: `${firstName} ${lastName}`, // Schema uses 'name', frontend sends split names. Adapting here.
            school_id,
            educationLevel, // Note: Schema might need update if this field is missing, checking schema...
            fees: {
                term_bill: term_bill || 0,
                amount_paid: 0,
                status: 'owing'
            },
            qr_code_string
        });

        res.status(201).json(student);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update student fees
// @route   PUT /api/students/:id/fees
// @access  Private
export const updateStudentFees = async (req: Request, res: Response) => {
    try {
        const { amount_paid } = req.body;
        const student = await StudentModel.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update fees
        student.fees.amount_paid = amount_paid;
        student.fees.status = calculateFeeStatus(student.fees.term_bill, amount_paid);

        await student.save();

        res.status(200).json(student);
    } catch (error: any) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
