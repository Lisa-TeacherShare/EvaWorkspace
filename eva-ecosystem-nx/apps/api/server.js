// In apps/api/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Initial Configuration ---
// Load environment variables from .env file.
dotenv.config();

// Initialize Firebase Admin SDK
require('./config/firebase');

// Connect to the MongoDB database
connectDB();

// --- App Initialization ---
const app = express();

// --- Core Middleware ---
// 1. Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
// 2. Enable Express to parse JSON in request bodies
app.use(express.json());

// --- Route Definitions ---
// Import all route files
const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/school'); // Corrected from 'schools' to match your file
const questionRoutes = require('./routes/questions');
const quizRoutes = require('./routes/quizzes');
const submissionRoutes = require('./routes/submission');
const aiRoutes = require('./routes/ai');
const leaderboardRoutes = require('./routes/leaderboard');
const analyticsRoutes = require('./routes/analytics');

// --- API Route Mounting ---
// Mount all the application routers to their respective paths
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);

// A simple test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});