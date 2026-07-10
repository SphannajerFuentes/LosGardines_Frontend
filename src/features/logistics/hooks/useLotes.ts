import { useState, useEffect } from 'react';
import { lotesService } from '../services/lotesService';

const extraerMensajeError = (err: any, fallback: string): string => {
  const detail = err.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((d: any) => d.msg).join(", ");
  }
  return detail || fallback;
};

export const useLotes = () => {
  const [lotes, setLotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const cargarLotes = async () => {
    setIsLoading(true);
    setError(null); 
    try {
      const data = await lotesService.listarActivosFefo();
      setLotes(data);
    } catch (err: any) {
      setError(extraerMensajeError(err, "No se pudieron cargar los lotes del inventario."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    cargarLotes(); 
  }, []);


  return { lotes, isLoading, error, cargarLotes };
};