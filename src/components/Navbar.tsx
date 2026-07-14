// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Search, UserCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/login'); // Redirige al login inmediatamente
  };

  return (
    <header className="h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-8 flex justify-between items-center shadow-sm">
      
      {/* Buscador Global */}
      <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 w-96">
        <Search className="w-5 h-5 text-on-surface-variant" />
        <input 
          className="bg-transparent border-none focus:ring-0 text-[14px] w-full text-on-surface outline-none placeholder:text-outline" 
          placeholder="Buscar lotes, medicamentos..." 
        />
      </div>

      {/* Info del Usuario y Logout */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-headline font-bold text-on-surface leading-none text-[14px]">
            {usuario?.email || 'Usuario'}
          </p>
          <p className="text-[11px] text-primary font-bold uppercase tracking-wide mt-1">
            {usuario?.rol || 'Sin Rol'}
          </p>
        </div>
        
        {/* Avatar por defecto */}
        <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
          <UserCircle className="w-6 h-6" />
        </div>

        {/* Separador vertical */}
        <div className="h-8 w-px bg-outline-variant/30"></div>

        {/* Botón de Cerrar Sesión */}
        <button 
          onClick={handleCerrarSesion}
          className="flex items-center gap-2 text-error hover:bg-error-container hover:text-on-error-container px-3 py-2 rounded-lg transition-colors font-semibold text-[13px]"
          title="Cerrar Sesión"
        >
          <LogOut className="w-5 h-5" />
          <span>Salir</span>
        </button>
      </div>
    </header>
  );
};