import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken'); // Check if token exists
  return !!token; // Return true if token exists, otherwise false
};

const ProtectedRoute = ({ children }) => {
  console.log("Token in ProtectedRoute:", localStorage.getItem('accessToken'));
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />; // Redirect to Sign In if not authenticated
  }
  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;