// src/components/TeacherProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TeacherProtectedRoute = () => {
  const token = localStorage.getItem('eva-token');

  if (!token) {
    // If no token, not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.accountType;

    // Check if user has the required role
    if (userRole === 'teacher' || userRole === 'school_admin') {
      return <Outlet />; // If they are a teacher/admin, show the page
    } else {
      // If logged in but not a teacher/admin, send them to the student dashboard
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    console.error("Invalid token:", error);
    localStorage.removeItem('eva-token');
    return <Navigate to="/" />;
  }
};

export default TeacherProtectedRoute;