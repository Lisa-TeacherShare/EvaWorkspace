// db.js
require('dotenv').config(); // load env immediately
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  console.log('MONGO_URI present?', !!uri);

  if (!uri) {
    console.error('MONGO_URI missing. Check .env and dotenv placement.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri); // modern Mongoose does defaults
    console.log(`MongoDB connected -> host: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error(err); // helpful stack/driver info
    process.exit(1);
  }
};

module.exports = connectDB;
