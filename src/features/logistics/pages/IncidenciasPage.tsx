import React, { useState } from "react";
import { useIncidencias } from "../hooks/useIncidencias";
import { AlertTriangle, CheckCircle, PackageX, Calendar } from "lucide-react";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";

export const IncidenciasPage: React.FC = () => {
  const { incidencias, isLoading, marcarComoResuelta } = useIncidencias();
  
  // Estados para notificaciones
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  const getTipoLabel = (tipo: number) => {
    switch(tipo) {
      case 1: return "Dañado/Roto";
      case 2: return "Faltante";
      case 3: return "Vencido";
      default: return "Otro";
    }
  };

  // Envoltorio para disparar la notificación al resolver
  const handleMarcarResuelta = async (id: number) => {
    try {
      await marcarComoResuelta(id);
      setMsgSuccess("¡Incidencia marcada como resuelta correctamente!");
    } catch (error) {
      setMsgError("Hubo un error al intentar actualizar la incidencia.");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      <div className="space-y-4">
        {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}
        {msgSuccess && <NotificacionFeedback mensaje={msgSuccess} tipo="success" onClose={() => setMsgSuccess(null)} />}
      </div>

      <h2 className="text-2xl font-bold flex items-center gap-3">
        <div className="p-2.5 bg-error/10 rounded-xl text-error"><AlertTriangle className="w-6 h-6" /></div>
        Panel de Incidencias Logísticas
      </h2>
      <p className="text-on-surface-variant">Revisa los problemas detectados durante la recepción de mercadería.</p>

      {isLoading ? (
        <div className="text-center py-10">Cargando reportes...</div>
      ) : incidencias.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border text-center text-outline">No hay incidencias reportadas. ¡Todo perfecto!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidencias.map((inc) => (
            <div key={inc.id} className={`bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${inc.estado === 1 ? 'border-warning/50' : 'opacity-75'}`}>
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${inc.estado === 1 ? 'bg-warning/10 text-warning-dark' : 'bg-success/10 text-success-dark'}`}>
                    {inc.estado === 1 ? "Pendiente" : "Resuelta"}
                  </span>
                  <span className="text-xs font-bold text-outline">Ord. #{inc.orden_id}</span>
                </div>
                
                <h3 className="font-bold text-lg">{inc.proveedor}</h3>
                
                <div className="flex items-center gap-2 mt-2 text-sm text-error font-medium">
                  <PackageX className="w-4 h-4" /> {getTipoLabel(inc.tipo)}
                </div>

                <p className="mt-3 text-sm text-on-surface-variant bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30">
                  {inc.descripcion}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="text-xs text-outline flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(inc.fecha).toLocaleDateString()}
                </span>
                
                {inc.estado === 1 && (
                  <button 
                    onClick={() => handleMarcarResuelta(inc.id)}
                    className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <CheckCircle className="w-4 h-4" /> Marcar Resuelta
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};