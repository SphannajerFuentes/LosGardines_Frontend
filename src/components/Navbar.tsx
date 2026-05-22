import React from 'react';

export const Navbar: React.FC = () => (
  <header className="h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-8 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 w-96">
      <span className="material-symbols-outlined text-on-surface-variant">search</span>
      <input className="bg-transparent border-none focus:ring-0 text-label-md w-full" placeholder="Buscar..." />
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="font-label-md text-on-surface leading-none">Dra. Helena Girasol</p>
        <p className="text-[10px] text-on-surface-variant font-medium uppercase">Administradora</p>
      </div>
      <img src="avatar.jpg" className="w-10 h-10 rounded-full" />
    </div>
  </header>
);