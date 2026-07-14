// src/features/admin/pages/ProveedoresPage.tsx
import React, { useState, useEffect } from 'react';
import { FormularioProveedor } from '../components/FormularioProveedor';
import { useGestionProveedores } from '../hooks/useGestionProveedores';
import { NotificacionFeedback } from '../../../components/NotificacionFeedback';
import { Building2 } from 'lucide-react';

export const ProveedoresPage: React.FC = () => {
  const { proveedores, cargarProveedores, registrar, isLoading, error, success } = useGestionProveedores();
  
  // Estados locales de control para permitir el cierre manual de la alerta en esta vista
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  useEffect(() => { if (error) setMsgError(error); }, [error]);
  useEffect(() => { if (success) setMsgSuccess(typeof success === 'string' ? success : "Proveedor registrado con éxito"); }, [success]);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 font-body">
      <div>
        <h2 className="text-2xl font-bold font-headline text-on-surface flex items-center gap-2">
          <Building2 className="w-6 h-6 text-primary" /> Gestión de Proveedores
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Administra las entidades comerciales y laboratorios de distribución farmacológica.
        </p>
      </div>
      
      {/* PANEL DINÁMICO DE NOTIFICACIONES */}
      <div className="space-y-4">
        {msgError && (
          <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />
        )}
        {msgSuccess && (
          <NotificacionFeedback mensaje={msgSuccess} tipo="success" onClose={() => setMsgSuccess(null)} />
        )}
      </div>

      {/* 1. Formulario de Registro */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <FormularioProveedor onSubmitting={(d, r) => registrar(d, r).then(cargarProveedores)} isLoading={isLoading} />
      </div>

      {/* 2. Tabla de Proveedores (El Catálogo) */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b bg-surface-container-low font-bold">
          Catálogo de Entidades Asociadas
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low/40 text-sm text-outline">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Contacto</th>
              <th className="p-4">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id} className="border-t hover:bg-surface-container-low/20 transition-colors">
                <td className="p-4 font-bold text-on-surface">{p.nombre}</td>
                <td className="p-4 text-on-surface-variant">{p.contacto}</td>
                <td className="p-4 font-mono text-xs">{p.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};