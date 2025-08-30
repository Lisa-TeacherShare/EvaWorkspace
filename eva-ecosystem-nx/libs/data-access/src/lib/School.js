const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'School name is required'],
    trim: true,
    unique: true
  },
  address: {
    type: String,
    required: [true, 'School address is required']
  },
  // We will link this to the Admin user who created the school
  administrator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;