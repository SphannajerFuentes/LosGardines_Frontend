// src/features/admin/pages/ProveedoresPage.tsx
import React from 'react';
import { FormularioProveedor } from '../components/FormularioProveedor';
import { useGestionProveedores } from '../hooks/useGestionProveedores';
import { NotificacionError } from '../../../components/NotificacionError';

export const ProveedoresPage: React.FC = () => {
  const { registrar, isLoading, error, success, setError } = useGestionProveedores();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Gestión de Proveedores</h2>
      
      <div className="bg-surface-container-lowest p-8 rounded-2xl border">
        {error && <NotificacionError mensaje={error} onClose={() => setError(null)} />}
        {success && <p className="text-secondary font-bold mb-4">{success}</p>}
        
        <FormularioProveedor onSubmitting={registrar} isLoading={isLoading} />
      </div>
    </div>
  );
};