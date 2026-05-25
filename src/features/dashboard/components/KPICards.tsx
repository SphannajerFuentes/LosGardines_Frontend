import React from 'react';
import { Package, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

export const KPICards: React.FC = () => {
  const kpis = [
    { title: "Stock Total", value: "12,482", icon: Package, color: "text-primary", bg: "bg-primary-container/20" },
    { title: "Ventas Hoy", value: "S/ 1,240.50", icon: TrendingDown, color: "text-secondary", bg: "bg-secondary-container" },
    { title: "Lotes por Vencer", value: "14", icon: AlertTriangle, color: "text-on-error-container", bg: "bg-error-container" },
    { title: "Órdenes Recibidas", value: "5", icon: CheckCircle, color: "text-on-secondary-fixed-variant", bg: "bg-secondary-fixed" },
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
              <h3 className="font-headline text-2xl font-bold text-on-surface">{kpi.value}</h3>
            </div>
          </div>
        );
      })}
    </section>
  );
};