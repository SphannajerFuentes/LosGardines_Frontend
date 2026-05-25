import React, { useState } from 'react';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface FormularioLoginProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FormularioLogin: React.FC<FormularioLoginProps> = ({ onSubmit, isLoading }) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Campo Usuario */}
      <div>
        <label className="block text-[14px] font-semibold text-on-surface-variant mb-2">
          Nombre de Usuario
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="text" 
            name="nombre" 
            placeholder="Ej. admin_girasol"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            required
            autoComplete="username"
          />
        </div>
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="block text-[14px] font-semibold text-on-surface-variant mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type={mostrarPassword ? "text" : "password"} 
            name="contrasena" 
            placeholder="••••••••"
            className="w-full pl-10 pr-12 py-3 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            required
            autoComplete="current-password"
          />
          <button 
            type="button"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
          >
            {mostrarPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>
      </div>
      
      {/* Botón Submit */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-primary text-on-primary py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-semibold mt-4 shadow-sm"
      >
        <span>{isLoading ? "Verificando credenciales..." : "Ingresar al Sistema"}</span>
        {!isLoading && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
};