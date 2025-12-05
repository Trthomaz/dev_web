import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { token, role, setAuthMessage } = useAuthStore.getState();
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  if (requireAdmin && role !== 'ROLE_ADMIN') {
    setAuthMessage && setAuthMessage('Você não tem permissão para acessar este recurso.');
    return <Navigate to='/login' replace />;
  }
  return children;
}
