import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { KPICards } from '../components/KPICards';
import { AlertPanel } from '../components/AlertPanel';
import { dashboardService } from '../services/dashboardService';
import { Loader2 } from 'lucide-react';
import { NotificacionFeedback } from '../../../components/NotificacionFeedback';

export const DashboardPage: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [kpiData, alertsData] = await Promise.all([
          dashboardService.getKPIs(),
          dashboardService.getAlerts()
        ]);
        
        setKpis(kpiData);
        setAlerts(alertsData);
      } catch (err: any) {
        console.error("Error cargando datos del dashboard:", err);
        setError("No se pudieron cargar los indicadores en tiempo real.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] w-full items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="font-headline font-semibold text-on-surface-variant text-[15px]">
          Sincronizando inventario en tiempo real...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10 font-body">
      {/* 🔔 Panel Dinámico de Notificaciones */}
      {error && (
        <NotificacionFeedback mensaje={error} tipo="error" onClose={() => setError(null)} />
      )}

      <HeroSection />
      
      {/* Pasamos los datos dinámicos como props */}
      <KPICards data={kpis} />
      
      <AlertPanel alerts={alerts} />
    </div>
  );
};