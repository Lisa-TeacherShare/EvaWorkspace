// In apps/api/config/firebase.js

const admin = require('firebase-admin');

// This line loads the secret key you downloaded
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Admin SDK Initialized.');

module.exports = admin;