// src/AppRoutes.tsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { Layout } from "./components/Layout";
import { AdminGuard } from "./components/AdminGuard";
import { UsuariosPage } from "./features/admin/pages/UsuariosPage";
import { ProveedoresPage } from "./features/admin/pages/ProveedoresPage";
import { IncidenciasPage } from "./features/logistics/pages/IncidenciasPage";
import { RecepcionPage } from "./features/logistics/pages/RecepcionPage";
import { IngresoStockPage } from './features/logistics/pages/IngresoStockPage';
import { GestionInventarioPage } from "./features/logistics/pages/GestionInventarioPage";

const RutaProtegida = ({ children }: { children: React.ReactElement }) => {
  const { usuario, cargandoSesion } = useContext(AuthContext);

  if (cargandoSesion)
    return (
      <div className="flex h-screen w-full items-center justify-center font-headline text-primary">
        Verificando sesión...
      </div>
    );

  return usuario ? children : <Navigate to="/login" replace />;
};

export function AppRoutes() {
  const { usuario } = useContext(AuthContext);

  return (
    <Routes>
      {/* 🚦 Semáforo Inicial */}
      <Route
        path="/"
        element={<Navigate to={usuario ? "/dashboard" : "/login"} replace />}
      />

      {/* Ruta Pública */}
      <Route
        path="/login"
        element={usuario ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      {/* Rutas Privadas (Todas envueltas en RutaProtegida y Layout) */}
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

      {/* Rutas de Administrador (Dentro del mismo Routes, sin anidar otro Routes) */}
      <Route
        path="/admin/usuarios"
        element={
          <RutaProtegida>
            <Layout>
              <AdminGuard>
                <UsuariosPage />
              </AdminGuard>
            </Layout>
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/proveedores"
        element={
          <RutaProtegida>
            <Layout>
              <AdminGuard>
                <ProveedoresPage />
              </AdminGuard>
            </Layout>
          </RutaProtegida>
        }
      />

      <Route
        path="/compras"
        element={
          <RutaProtegida>
            <Layout>
              <RecepcionPage />
            </Layout>
          </RutaProtegida>
        }
      />
      <Route
        path="/incidencias"
        element={
          <RutaProtegida>
            <Layout>
              <IncidenciasPage />
            </Layout>
          </RutaProtegida>
        }
      />

      <Route
        path="/compras"
        element={
          <RutaProtegida>
            <Layout>
              <RecepcionPage />
            </Layout>
          </RutaProtegida>
        }
      />

      <Route path="/inventario" element={
        <RutaProtegida>
          <Layout>
            <GestionInventarioPage /> 
          </Layout>
        </RutaProtegida>
      } />

      {/* Cualquier otra ruta inexistente */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
