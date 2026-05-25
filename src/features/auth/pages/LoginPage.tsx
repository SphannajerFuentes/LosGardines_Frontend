// src/features/auth/pages/LoginPage.tsx
import React from 'react';
import { FormularioLogin } from '../components/FormularioLogin';
import { NotificacionError } from '../../../components/NotificacionError'; // Ajusta la ruta según tu carpetas

import { HeartPulse } from 'lucide-react';
import { useLogin } from '../hook/useLogin';

export const LoginPage: React.FC = () => {
  const { login, isLoading, error, limpiarError } = useLogin();

  return (
    <div className="flex h-screen w-full overflow-hidden font-body bg-background">
      {/* Sidebar Visual con tu gradiente .bg-mesh */}
      <div className="hidden lg:flex lg:w-1/2 bg-mesh relative items-center justify-center p-12">
        <div className="text-white space-y-4 max-w-md">
          <h2 className="font-headline text-4xl font-bold leading-tight">Sistema de Gestión Logística</h2>
          <p className="opacity-80 text-[15px]">Control estricto de inventarios, trazabilidad de lotes y despacho FIFO para Farmacia Los Girasoles.</p>
        </div>
      </div>

      {/* Login Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <HeartPulse className="text-primary w-8 h-8" />
            <span className="text-[22px] font-headline font-bold text-on-surface tracking-tight">Los Girasoles</span>
          </div>
          
          {/* Tarjeta de Formulario */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm space-y-6">
            
            {/* 🔔 Notificación de Error Dinámica */}
            <NotificacionError mensaje={error} onClose={limpiarError} />

            <FormularioLogin onSubmit={login} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};