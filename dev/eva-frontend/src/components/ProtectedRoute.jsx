// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('eva-token');

  // If token exists, allow access to the nested routes (via <Outlet />)
  // Otherwise, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;