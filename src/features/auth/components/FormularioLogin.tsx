import React from 'react';
import { User, ArrowRight } from 'lucide-react';

interface FormularioLoginProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FormularioLogin: React.FC<FormularioLoginProps> = ({ onSubmit, isLoading }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block text-[14px] font-semibold text-on-surface-variant mb-2">
          Nombre de Usuario
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="text" 
            name="nombre" // Este name coincide con tu hook useLogin
            placeholder="Ej. sphannajer"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary-container outline-none"
            required
            autoComplete="username"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-primary-container text-white py-4 rounded-lg hover:bg-primary-container/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>{isLoading ? "Verificando..." : "Ingresar al Sistema"}</span>
        {!isLoading && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
};