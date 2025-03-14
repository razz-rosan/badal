import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (role) {
    const user = JSON.parse(userStr);
    if (user.role !== role) {
      return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default PrivateRoute;
