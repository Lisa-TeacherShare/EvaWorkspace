const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes: Checks if user is logged in
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

// Authorize specific roles: Checks user's accountType
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.accountType)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.accountType}' is not authorized to access this route`
      });
    }
    next();
  };
};