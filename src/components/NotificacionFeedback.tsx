// src/components/NotificacionFeedback.tsx
import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface NotificacionFeedbackProps {
  mensaje: string | null;
  tipo: 'success' | 'error';
  onClose: () => void;
  autoCloseTime?: number; // Opcional: Cerrado automático en milisegundos
}

export const NotificacionFeedback: React.FC<NotificacionFeedbackProps> = ({ 
  mensaje, 
  tipo, 
  onClose,
  autoCloseTime = 5000 
}) => {
  
  // Auto-cerrado inteligente cuando aparece un mensaje
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      return () => clearTimeout(timer);
    }
  }, [mensaje, autoCloseTime, onClose]);

  if (!mensaje) return null;

  const esError = tipo === 'error';

  return (
    <div className={`border p-4 rounded-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
      esError 
        ? "bg-error-container text-on-error-container border-error/20" 
        : "bg-secondary-container text-on-secondary-container border-secondary/20"
    }`}>
      {esError ? (
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1">
        <h4 className="font-headline font-bold text-[14px]">
          {esError ? 'Hubo un problema' : 'Operación exitosa'}
        </h4>
        <p className="font-body text-[13px] opacity-90 mt-0.5 leading-relaxed">
          {mensaje}
        </p>
      </div>

      <button 
        onClick={onClose}
        type="button"
        className="opacity-60 hover:opacity-100 p-1 rounded-lg transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};