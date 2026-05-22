import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface FormularioLoginProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FormularioLogin: React.FC<FormularioLoginProps> = ({ onSubmit, isLoading }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block text-[14px] font-semibold text-on-surface-variant mb-2">Correo Electrónico</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="email" 
            name="email"
            placeholder="nombre@farmacia.com"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary-container outline-none"
            required
          />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-[14px] font-semibold text-on-surface-variant">Contraseña</label>
          <a href="#" className="text-[14px] text-primary hover:underline">¿Olvidó su contraseña?</a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="password" 
            name="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary-container outline-none"
            required
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-primary-container text-white py-4 rounded-lg hover:bg-primary-container/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>{isLoading ? "Ingresando..." : "Iniciar Sesión"}</span>
        {!isLoading && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
};