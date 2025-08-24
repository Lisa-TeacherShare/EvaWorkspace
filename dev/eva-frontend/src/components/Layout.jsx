// src/components/Layout.jsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Layout = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // This is our updated logout handler
  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem('eva-token');

    // 2. Redirect the user to the login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-white text-xl font-bold">
            Eva Premium
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Page Content */}
      <main className="container mx-auto p-8">
        <Outlet /> {/* Child pages like DashboardPage will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;