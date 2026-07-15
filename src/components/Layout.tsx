import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-surface text-on-surface font-body overflow-hidden">
      
      {/* Overlay oscuro para pantallas pequeñas (cierra el menú al hacer clic fuera) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Menú Lateral Fijo / Responsivo */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Detecta clics en los enlaces para cerrar el menú automáticamente en móvil */}
        <div 
          className="h-full shadow-2xl lg:shadow-none" 
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setIsSidebarOpen(false);
          }}
        >
          <Sidebar />
        </div>
      </div>
      
      {/* Contenedor Derecho */}
      <div className="flex flex-col flex-1 overflow-hidden w-full relative">
        {/* Barra Superior Fija (se le pasa el control del menú) */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Área de Contenido Dinámico (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};