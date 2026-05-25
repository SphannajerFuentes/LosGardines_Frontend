// src/features/admin/pages/UsuariosPage.tsx
import React from 'react';
import { FormularioUsuario } from '../components/FormularioUsuario';
import { useGestionUsuarios } from '../hooks/useGestionUsuarios';
import { NotificacionError } from '../../../components/NotificacionError';
import { CheckCircle, ShieldAlert } from 'lucide-react';

export const UsuariosPage: React.FC = () => {
  const { registrar, isLoading, error, successMessage, setError } = useGestionUsuarios();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-body">
      <div>
        <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-primary" />
          Control de Accesos y Usuarios
        </h2>
        <p className="text-on-surface-variant text-[14px] mt-1">
          Da de alta a nuevos trabajadores asignándoles roles específicos para garantizar la trazabilidad de la farmacia.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm space-y-6">
        
        {/* Manejo Dinámico de Notificaciones */}
        {error && (
          <NotificacionError mensaje={error} onClose={() => setError(null)} />
        )}

        {successMessage && (
          <div className="bg-secondary-container text-on-secondary-container border border-secondary/20 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
            <p className="text-[13px] font-medium">{successMessage}</p>
          </div>
        )}

        <FormularioUsuario onSubmitting={registrar} isLoading={isLoading} />
      </div>
    </div>
  );
};