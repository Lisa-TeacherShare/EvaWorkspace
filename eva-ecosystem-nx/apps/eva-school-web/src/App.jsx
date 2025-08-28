import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import { auth } from './firebase'; // Import the auth instance we created
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null); // This will hold the actual Firebase user object
  const [loading, setLoading] = useState(true); // Used to show a loading state while checking auth
  const [error, setError] = useState(''); // Used to display login errors

  // This `useEffect` hook is the core of the authentication flow.
  // It sets up a listener that runs whenever the user signs in or out.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        // We'll store the essential user info in our state.
        setUser({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Admin User', // Mocking name/role for now
            role: 'Admin'
        });
      } else {
        // User is signed out.
        setUser(null);
      }
      // We're done checking, so we can stop showing the loading message.
      setLoading(false);
    });

    // This is a cleanup function that runs when the component is removed
    // to prevent memory leaks.
    return () => unsubscribe();
  }, []); // The empty array [] means this effect only runs once.

  const handleLogin = async (email, password) => {
    setError(''); // Clear any previous login errors
    try {
      // This is the actual Firebase function to sign in a user.
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, the onAuthStateChanged listener above will automatically update the user state.
    } catch (err) {
      console.error("Firebase Login Error:", err);
      setError('Failed to sign in. Please check your email and password.');
    }
  };

  const handleLogout = async () => {
    try {
      // This is the Firebase function to sign out a user.
      await signOut(auth);
      // The onAuthStateChanged listener will automatically set the user state to null.
    } catch (err) {
      console.error("Firebase Logout Error:", err);
    }
  };

  // While Firebase is checking if you're already logged in, show a simple loading message.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="antialiased bg-gray-50 text-gray-800 min-h-screen">
      {user ? (
        <DashboardPage user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

export default App;