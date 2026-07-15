// src/features/admin/pages/UsuariosPage.tsx
import React from "react";
import { FormularioUsuario } from "../components/FormularioUsuario";
import { useGestionUsuarios } from "../hooks/useGestionUsuarios";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";
import { ShieldAlert } from "lucide-react";

export const UsuariosPage: React.FC = () => {
  const { registrar, usuarios, isLoading, error, successMessage, setError } =
    useGestionUsuarios();

  // Forzamos un tipado seguro o fallback si tu hook no expone un setSuccess directo
  const limpiarNotificaciones = () => {
    setError(null);
    // Si tu hook tuviera un setSuccessMessage(null), lo llamarías aquí. 
    // Gracias al autoClose del componente, se limpiará visualmente de todas formas.
  };

  const getRolNombre = (rol: number) => {
    switch (rol) {
      case 1: return "Administrador";
      case 2: return "Almacenero";
      case 3: return "Farmacéutico";
      default: return "Desconocido";
    }
  };

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
        
        {/* PANEL DINÁMICO DE NOTIFICACIONES */}
        {error && (
          <NotificacionFeedback mensaje={error} tipo="error" onClose={limpiarNotificaciones} />
        )}

        {successMessage && (
          <NotificacionFeedback mensaje={successMessage} tipo="success" onClose={limpiarNotificaciones} />
        )}

        <FormularioUsuario onSubmitting={registrar} isLoading={isLoading} />
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-surface-container-low font-bold">
          Usuarios del Sistema
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-outline">
              <th className="p-4">Nombre</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-4 font-semibold">{u.nombre}</td>
                <td className="p-4 text-primary font-medium">{getRolNombre(u.rol)}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Activo</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};