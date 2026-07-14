import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-surface text-on-surface font-body overflow-hidden">
      {/* Menú Lateral Fijo */}
      <Sidebar />
      
      {/* Contenedor Derecho */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Barra Superior Fija */}
        <Navbar />
        
        {/* Área de Contenido Dinámico (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};