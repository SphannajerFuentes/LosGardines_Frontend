import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Search, UserCircle, Menu } from 'lucide-react';

// Se añade prop opcional para manejar el botón de menú en móvil
interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/login'); // Redirige al login inmediatamente
  };

  return (
    <header className="h-16 sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-4 md:px-8 flex justify-between items-center shadow-sm w-full gap-2 md:gap-4">
      
      {/* Controles Izquierdos: Menú Móvil + Buscador */}
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        
        {/* Botón Hamburguesa (solo visible en pantallas menores a lg) */}
        <button 
          onClick={onMenuClick} 
          className="p-2 -ml-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface lg:hidden transition-colors flex-shrink-0"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Buscador Global Responsivo */}
        <div className="flex items-center gap-2 md:gap-4 bg-surface-container-low px-3 md:px-4 py-2 rounded-full border border-outline-variant/20 w-full max-w-[200px] sm:max-w-md">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-on-surface-variant flex-shrink-0" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-[13px] md:text-[14px] w-full text-on-surface outline-none placeholder:text-outline/70 truncate" 
            placeholder="Buscar..." 
          />
        </div>
      </div>

      {/* Info del Usuario y Logout */}
      <div className="flex items-center gap-2 md:gap-6 justify-end flex-shrink-0">
        
        {/* Textos del usuario (Ocultos en móvil muy pequeño para ahorrar espacio) */}
        <div className="hidden sm:block text-right">
          <p className="font-headline font-bold text-on-surface leading-none text-[13px] md:text-[14px] truncate max-w-[150px]">
            {usuario?.email || 'Usuario'}
          </p>
          <p className="text-[10px] md:text-[11px] text-primary font-bold uppercase tracking-wide mt-1 truncate">
            {usuario?.rol || 'Sin Rol'}
          </p>
        </div>
        
        {/* Avatar por defecto */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
          <UserCircle className="w-5 h-5 md:w-6 md:h-6" />
        </div>

        {/* Separador vertical */}
        <div className="hidden sm:block h-8 w-px bg-outline-variant/30 mx-1 md:mx-0"></div>

        {/* Botón de Cerrar Sesión */}
        <button 
          onClick={handleCerrarSesion}
          className="flex items-center justify-center gap-1 md:gap-2 text-error hover:bg-error-container hover:text-on-error-container p-2 md:px-3 md:py-2 rounded-lg transition-colors font-semibold text-[13px]"
          title="Cerrar Sesión"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};