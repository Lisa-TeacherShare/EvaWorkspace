const express = require('express');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Body parser middleware to accept JSON
app.use(express.json());

// A simple test route to confirm the server is working
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount the new authentication router
app.use('/api/auth', require('./routes/auth'));
// Mount the new questions router
app.use('/api/questions', require('./routes/questions'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});