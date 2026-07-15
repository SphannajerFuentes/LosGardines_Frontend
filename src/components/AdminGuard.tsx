// src/components/AdminGuard.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario, cargandoSesion } = useContext(AuthContext);

  if (cargandoSesion) return null; // O un spinner de carga

  // Si no es administrador, lo mandamos de vuelta al dashboard
  if (usuario?.rol !== 'Administrador') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};