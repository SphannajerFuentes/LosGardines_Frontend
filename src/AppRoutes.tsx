import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './features/auth/pages/LoginPage';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';

// import { ProtectedRoute } from './ProtectedRoute'; // Opcional pero recomendado

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas Protegidas (Requieren Login) */}
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};