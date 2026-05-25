import React from 'react';
import { AlertCircle } from 'lucide-react';

export const AlertPanel: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-error" />
          Alertas de Stock y Caducidad
        </h3>
        <span className="bg-error-container text-on-error-container text-xs font-bold px-3 py-1 rounded-full">
          3 Críticas
        </span>
      </div>
      
      <div className="p-5 space-y-4 overflow-y-auto">
        {/* Ejemplo estático por ahora, luego se llenará con dashboardService.getAlerts() */}
        <div className="flex items-start gap-4 p-4 rounded-xl border border-error-container bg-error-container/20">
          <div className="w-2 h-2 rounded-full bg-error mt-2"></div>
          <div>
            <p className="font-bold text-on-surface text-[14px]">Paracetamol 500mg - Lote P-102</p>
            <p className="text-on-surface-variant text-[13px]">Próximo a caducar en 15 días.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-xl border border-tertiary-container bg-tertiary-container/10">
          <div className="w-2 h-2 rounded-full bg-tertiary mt-2"></div>
          <div>
            <p className="font-bold text-on-surface text-[14px]">Ibuprofeno 400mg</p>
            <p className="text-on-surface-variant text-[13px]">Stock bajo (Punto de reorden cruzado: 45 / 50 unid).</p>
          </div>
        </div>
      </div>
    </div>
  );
};