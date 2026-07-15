// src/features/dashboard/components/AlertPanel.tsx
import React from 'react';
import { AlertCircle, Inbox, PackageCheck, CalendarX } from 'lucide-react';

interface AlertaItem {
  id: string | number;
  medicamento: string;
  lote?: string;
  tipo: 'critico' | 'advertencia' | string;
  categoria: 'stock' | 'pedido' | 'vencimiento' | string;
  mensaje: string;
}

interface AlertPanelProps {
  alerts: AlertaItem[];
}

const SECCIONES: { key: string; titulo: string; icono: React.ElementType }[] = [
  { key: 'stock', titulo: 'Stock Mínimo', icono: AlertCircle },
  { key: 'pedido', titulo: 'Pedidos Pendientes', icono: PackageCheck },
  { key: 'vencimiento', titulo: 'Lotes Vencidos / Por Vencer', icono: CalendarX },
];

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
        <h3 className="font-headline font-bold text-on-surface flex items-center gap-2 text-[15px]">
          <AlertCircle className="w-5 h-5 text-error" />
          Alertas del Sistema
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${alerts.length > 0 ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
          {alerts.length} {alerts.length === 1 ? 'Alerta' : 'Alertas'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
        {SECCIONES.map((seccion) => {
          const Icono = seccion.icono;
          const itemsSeccion = alerts.filter((a) => a.categoria === seccion.key);

          return (
            <div key={seccion.key} className="flex flex-col">
              <div className="px-4 py-3 flex items-center justify-between border-b border-outline-variant/20">
                <span className="flex items-center gap-2 text-[13px] font-bold text-on-surface-variant">
                  <Icono className="w-4 h-4" />
                  {seccion.titulo}
                </span>
                <span className="text-[11px] font-bold text-outline">{itemsSeccion.length}</span>
              </div>

              <div className="p-4 space-y-3 overflow-y-auto max-h-80 custom-scrollbar">
                {itemsSeccion.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-outline gap-1 py-6">
                    <Inbox className="w-6 h-6" />
                    <p className="text-[12px] font-medium">Sin novedades</p>
                  </div>
                ) : (
                  itemsSeccion.map((alerta) => {
                    const esCritico = alerta.tipo === 'critico';
                    const clasesContenedor = esCritico
                      ? "border-error-container bg-error-container/20"
                      : "border-tertiary-container bg-tertiary-container/10";
                    const clasesPunto = esCritico ? "bg-error" : "bg-tertiary";

                    return (
                      <div
                        key={alerta.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${clasesContenedor}`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${clasesPunto}`}></div>
                        <div>
                          <p className="font-bold text-on-surface text-[13px]">
                            {alerta.medicamento} {alerta.lote ? `- Lote ${alerta.lote}` : ''}
                          </p>
                          <p className="text-on-surface-variant text-[12px] mt-0.5 leading-relaxed">
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
        })}
      </div>
    </div>
  );
};