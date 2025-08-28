const admin = require('../config/firebase');
const { User } = require('../models/User');

/**
 * Middleware to protect routes by verifying a Firebase ID token.
 *
 * If the token is valid, it decodes it, finds the corresponding user
 * in the MongoDB database, and attaches the user object to the request (`req.user`).
 * If the token is missing or invalid, it sends a 401 Unauthorized response.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);

      // Find the user in our database using the Firebase UID
      req.user = await User.findOne({ firebaseId: decodedToken.uid });

      if (!req.user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };