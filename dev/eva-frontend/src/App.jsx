// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State to hold the user's email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to hold any error messages from the server
  const [error, setError] = useState('');

  // This function updates the state as the user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError(''); // Clear any previous errors

    try {
      // Send the form data to your backend's login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // If login is successful, the backend sends back a token
      const { token } = response.data;
      
      // For now, we'll just log the token to the console to confirm it works
      console.log('Login successful! Token:', token);
      alert('Login successful! Check the console for your token.');

      // In the next step, we will save this token and redirect the user.

    } catch (err) {
      // If the server responds with an error, display it
      const errorMessage = err.response?.data?.message || 'Invalid email or password.';
      setError(errorMessage);
      console.error('Login error:', err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome to Eva
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Display error message if it exists */}
          {error && <p className="bg-red-500 text-white text-center p-2 rounded-md mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email" // Added name attribute
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="you@example.com"
              value={formData.email} // Controlled input
              onChange={handleChange} // Call handleChange on change
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Added name attribute
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              value={formData.password} // Controlled input
              onChange={handleChange} // Call handleChange on change
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;