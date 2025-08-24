const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Handles Cross-Origin Resource Sharing
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Middleware ---
// 1. Enable CORS for all routes
app.use(cors());
// 2. Body parser middleware to accept JSON
app.use(express.json());

// --- API Routes ---
// A simple test route to confirm the server is working
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount all the application routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/submissions', require('./routes/submission'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/analytics', require('./routes/analytics'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});