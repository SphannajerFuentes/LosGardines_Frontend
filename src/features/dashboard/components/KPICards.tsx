// src/features/dashboard/components/KPICards.tsx
import React from 'react';
import { Package, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface KPICardsProps {
  data: {
    stock_total?: number | string;
    ventas_hoy?: number | string;
    lotes_por_vencer?: number | string;
    ordenes_recibidas?: number | string;
  } | null;
}

export const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  // Mapeamos los datos reales del backend respetando las llaves del json del servicio
  const kpis = [
    { 
      title: "Stock Total", 
      value: data?.stock_total ?? "0", 
      icon: Package, 
      color: "text-primary", 
      bg: "bg-primary-container/20" 
    },
    { 
      title: "Ventas Hoy", 
      value: typeof data?.ventas_hoy === 'number' ? `S/ ${data.ventas_hoy.toFixed(2)}` : (data?.ventas_hoy ?? "S/ 0.00"), 
      icon: TrendingDown, 
      color: "text-secondary", 
      bg: "bg-secondary-container" 
    },
    { 
      title: "Lotes por Vencer", 
      value: data?.lotes_por_vencer ?? "0", 
      icon: AlertTriangle, 
      color: "text-on-error-container", 
      bg: "bg-error-container" 
    },
    { 
      title: "Órdenes Recibidas", 
      value: data?.ordenes_recibidas ?? "0", 
      icon: CheckCircle, 
      color: "text-on-secondary-fixed-variant", 
      bg: "bg-secondary-fixed" 
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
              <Icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-on-surface-variant font-medium text-[13px]">{kpi.title}</p>
              <h3 className="font-headline text-2xl font-bold text-on-surface tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        );
      })}
    </section>
  );
};