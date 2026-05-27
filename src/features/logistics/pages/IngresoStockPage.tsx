import React, { useState, useEffect } from "react";
import { useLotes } from "../hooks/useLotes";
import { Loader2, CalendarX, AlertTriangle, ShieldCheck, Box } from "lucide-react";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";

export const IngresoStockPage: React.FC = () => {
  // Asumimos que tu hook puede retornar un error de red
  const { lotes, isLoading, error } = useLotes(); 
  const [msgError, setMsgError] = useState<string | null>(null);

  // Sincronizamos el error del hook con el estado local de la notificación
  useEffect(() => {
    if (error) setMsgError(error);
  }, [error]);

  return (
    <div className="space-y-6">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-on-surface">Inventario Físico (FEFO)</h3>
          <p className="text-sm text-on-surface-variant">Lotes activos ordenados por prioridad de despacho.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : lotes.length === 0 ? (
          <div className="p-12 text-center text-outline">No hay stock disponible actualmente.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="p-4">Medicamento</th>
                <th className="p-4">Lote</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4">Vencimiento</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {lotes.map((l) => {
                const isVencido = l.dias_para_vencer < 0;
                const isCritico = l.semaforo === "ROJO";
                
                return (
                  <tr key={l.id_lote} className={`hover:bg-surface-container-lowest transition-colors ${isVencido ? 'bg-error/5' : ''}`}>
                    <td className="p-4 font-bold">{l.medicamento_nombre}</td>
                    <td className="p-4 font-mono text-outline">{l.numero_lote}</td>
                    <td className="p-4 text-center font-bold">{l.cantidad_disponible}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{l.fecha_caducidad}</span>
                        <span className={`text-[11px] ${isVencido ? 'text-error font-bold' : 'text-outline'}`}>
                          {isVencido ? "Vencido" : `Vence en ${l.dias_para_vencer} días`}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        l.semaforo === "ROJO" || isVencido ? "bg-error/10 text-error" : 
                        l.semaforo === "AMARILLO" ? "bg-warning/10 text-warning-dark" : 
                        "bg-success/10 text-success"
                      }`}>
                        {isVencido ? <CalendarX className="w-3 h-3" /> : 
                         isCritico ? <AlertTriangle className="w-3 h-3" /> : 
                         <ShieldCheck className="w-3 h-3" />}
                        {l.semaforo}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};