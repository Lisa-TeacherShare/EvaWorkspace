// Filename: apps/api/controllers/auth.ts

import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import {
  StudentModel,
  TeacherModel,
  Admin,
  Student, // This is the TypeScript interface
} from '@eva-ecosystem-nx/data-access'; // Path alias from tsconfig.base.json

// @desc    Register a new user in Firebase and MongoDB
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, accountType, educationLevel } = req.body;

  try {
    // 1. Create user in Firebase Authentication
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // 2. Create user in our MongoDB, using the correct model based on accountType
    let newUser;
    const userData = {
      firebaseUid: userRecord.uid,
      email,
      firstName,
      lastName,
    };

    if (accountType === 'Student') {
      // Use the Student interface for type safety
      const studentData: Partial<Student> = {
        ...userData,
        educationLevel,
        subscription: { // Default subscription
          plan: 'none',
          status: 'inactive',
        }
      };
      newUser = await StudentModel.create(studentData);
    } else {
      // Handle Teacher/Admin registration similarly
      // For now, let's default to Admin for simplicity
      newUser = await Admin.create(userData);
    }

    // 3. Set custom claims for role-based access control
    await getAuth().setCustomUserClaims(userRecord.uid, { role: accountType });

    res.status(201).json({
      message: 'User created successfully',
      uid: userRecord.uid,
      dbId: newUser._id,
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json({ message: 'User registration failed', error });
  }
};

// ... other auth controller functions (login, etc.) will go here