// src/components/TeacherLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const TeacherLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('eva-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/teacher/dashboard" className="text-white text-xl font-bold">
            Eva School Portal
          </Link>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout; // <-- This is the line that fixes the error