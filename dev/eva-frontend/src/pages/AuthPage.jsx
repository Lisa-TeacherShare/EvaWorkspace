// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  // State to toggle between Login and Register views
  const [isLoginView, setIsLoginView] = useState(true);

  // State for all form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    const url = `http://localhost:5000${endpoint}`;

    try {
      const response = await axios.post(url, formData);

      if (isLoginView) {
        const { token } = response.data;
        console.log('Login successful! Token:', token);
        alert('Login successful! Check the console for your token.');
        // We will handle saving the token and redirecting next
      } else {
        setSuccess('Registration successful! Please log in.');
        setIsLoginView(true); // Switch to login view after successful registration
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred.';
      setError(errorMessage);
      console.error('Auth error:', err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isLoginView ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-500 text-white text-center p-2 rounded-md mb-4">{error}</p>}
          {success && <p className="bg-green-500 text-white text-center p-2 rounded-md mb-4">{success}</p>}

          {!isLoginView && (
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="fullName">Full Name</label>
              <input
                type="text" id="fullName" name="fullName"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={handleChange} required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email" id="email" name="email"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={handleChange} required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password" id="password" name="password"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={handleChange} required
            />
          </div>

          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            {isLoginView ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => { setIsLoginView(!isLoginView); setError(''); setSuccess(''); }} className="text-cyan-400 hover:text-cyan-300 text-sm">
            {isLoginView ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;