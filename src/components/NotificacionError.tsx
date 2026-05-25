// src/components/NotificacionError.tsx
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface NotificacionErrorProps {
  mensaje: string | null;
  onClose: () => void;
}

export const NotificacionError: React.FC<NotificacionErrorProps> = ({ mensaje, onClose }) => {
  if (!mensaje) return null;

  return (
    <div className="bg-error-container text-on-error-container border border-error/20 p-4 rounded-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
      <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
      
      <div className="flex-1">
        <h4 className="font-headline font-bold text-[14px] text-on-error-container">
          Hubo un problema
        </h4>
        <p className="font-body text-[13px] opacity-90 mt-0.5 leading-relaxed">
          {mensaje}
        </p>
      </div>

      <button 
        onClick={onClose}
        type="button"
        className="text-on-error-container/70 hover:text-on-error-container hover:bg-error-on-container/10 p-1 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};