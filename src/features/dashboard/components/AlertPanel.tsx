// src/features/dashboard/components/AlertPanel.tsx
import React from 'react';
import { AlertCircle, Inbox } from 'lucide-react';

interface AlertaItem {
  id: string | number;
  medicamento: string;
  lote?: string;
  tipo: 'critico' | 'advertencia' | string;
  mensaje: string;
}

interface AlertPanelProps {
  alerts: AlertaItem[];
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-100">
      {/* Cabecera del Panel */}
      <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2 text-[15px]">
          <AlertCircle className="w-5 h-5 text-error" />
          Alertas de Stock y Caducidad
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${alerts.length > 0 ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
          {alerts.length} {alerts.length === 1 ? 'Alerta' : 'Alertas'}
        </span>
      </div>
      
      {/* Cuerpo scrolleable */}
      <div className="p-5 space-y-4 overflow-y-auto flex-1自定义-scroll">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-outline gap-2 py-8">
            <Inbox className="w-8 h-8" />
            <p className="text-[13px] font-medium">Todo al día. No hay alertas críticas vigentes.</p>
          </div>
        ) : (
          alerts.map((alerta) => {
            // Evaluamos la criticidad para asignar estilos de color MD3 exactos
            const esCritico = alerta.tipo === 'critico';
            const clasesContenedor = esCritico 
              ? "border-error-container bg-error-container/20" 
              : "border-tertiary-container bg-tertiary-container/10";
            const clasesPunto = esCritico ? "bg-error" : "bg-tertiary";

            return (
              <div 
                key={alerta.id} 
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${clasesContenedor}`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${clasesPunto}`}></div>
                <div>
                  <p className="font-bold text-on-surface text-[14px]">
                    {alerta.medicamento} {alerta.lote ? `- Lote ${alerta.lote}` : ''}
                  </p>
                  <p className="text-on-surface-variant text-[13px] mt-0.5 leading-relaxed">
                    {alerta.mensaje}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};