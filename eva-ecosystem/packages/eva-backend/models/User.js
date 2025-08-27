const mongoose = require('mongoose');

// Base User Schema Options
const options = {
  // discriminatorKey tells Mongoose which field to use to differentiate between user types.
  discriminatorKey: 'kind',
  collection: 'users' // Ensure all user types are stored in the 'users' collection
};

// Base User Schema - fields that ALL users will have
const userSchema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: [true, 'Firebase ID is required'],
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  // You can add other common fields here, like 'name' or 'profilePictureUrl'
  name: {
    type: String,
    required: false
  }
}, options);

// Base User model
const User = mongoose.model('User', userSchema);

// Teacher Discriminator - Extends the User schema
const Teacher = User.discriminator('Teacher', new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
    // This will be required for teachers later on
  }
  // Add any other fields specific to Teachers
}));

// Student Discriminator - Extends the User schema
const Student = User.discriminator('Student', new mongoose.Schema({
  // Add any fields specific to Students, e.g., grade, parentId, etc.
  currentClass: {
    type: String
  }
}));

// Admin Discriminator - Extends the User schema
const Admin = User.discriminator('Admin', new mongoose.Schema({
  // Add any fields specific to Admins
  permissions: [String]
}));


module.exports = { User, Teacher, Student, Admin };