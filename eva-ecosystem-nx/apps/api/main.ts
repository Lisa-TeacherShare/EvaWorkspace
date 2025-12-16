// Filename: apps/api/main.ts

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

// --- Initial Configuration ---
dotenv.config();
import './config/firebase'; // Initializes Firebase Admin
connectDB();

// --- App Initialization ---
const app: Express = express();

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- Route Definitions ---
import authRoutes from './routes/auth';
import schoolRoutes from './routes/school';
import studentRoutes from './routes/students';
import questionRoutes from './routes/questions';
import quizRoutes from './routes/quizzes';
import submissionRoutes from './routes/submission';
import aiRoutes from './routes/ai';
import leaderboardRoutes from './routes/leaderboard';
import analyticsRoutes from './routes/analytics';

// --- API Route Mounting ---
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});