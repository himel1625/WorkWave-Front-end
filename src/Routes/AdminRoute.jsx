import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === 'Admin') return children;
  return <Navigate to='/' replace='true' />;
};

export default AdminRoute;
