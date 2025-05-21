import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken'); // Check if token exists
  return !!token; // Return true if token exists, otherwise false
};

const ProtectedRoute = ({ children }) => {
   return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;