// src/AppRoutes.tsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { LoginPage } from './features/auth/pages/LoginPage';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { Layout } from './components/Layout';

// 1. Componente Guardián de Autenticación General (Corregido con React.ReactElement)
const RutaProtegida = ({ children }: { children: React.ReactElement }) => {
  const { usuario, cargandoSesion } = useContext(AuthContext);

  if (cargandoSesion) return <div className="p-8 text-center text-lg">Verificando sesión...</div>;
  
  // Si no está logueado, lo mandamos al inicio de sesión
  return usuario ? children : <Navigate to="/login" replace />;
};

// 2. Componente Guardián de Roles Específicos (Corregido con React.ReactElement)
const RutaPorRol = ({ children, rolesPermitidos }: { children: React.ReactElement, rolesPermitidos: string[] }) => {
  const { usuario } = useContext(AuthContext);

  if (usuario && !rolesPermitidos.includes(usuario.rol)) {
    alert("Acceso denegado: Tu rol no tiene permisos para esta acción.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export function AppRoutes() {
  const { usuario } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta Pública: Login (NO usa Layout porque es a pantalla completa) */}
      <Route 
        path="/login" 
        element={usuario ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />

      {/* Rutas Privadas: ENVUELTAS EN EL LAYOUT */}
      <Route 
        path="/dashboard" 
        element={
          <RutaProtegida>
            <Layout>
              <DashboardPage />
            </Layout>
          </RutaProtegida>
        } 
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
