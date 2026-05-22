import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { KPICards } from '../components/KPICards';
import { AlertPanel } from '../components/AlertPanel';

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-8 space-y-10">
      <HeroSection />
      <KPICards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlertPanel />
        {/* Aquí podrías añadir un componente de Actividad reciente */}
      </div>
    </div>
  );
};