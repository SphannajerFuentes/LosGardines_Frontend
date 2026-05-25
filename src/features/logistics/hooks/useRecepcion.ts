// src/features/logistics/hooks/useRecepcion.ts
import { useState } from 'react';
import { logisticsService, type RecepcionDetalle,  } from '../services/logisticsService';

export const useRecepcion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const procesarRecepcion = async (id: number, detalles: RecepcionDetalle[]) => {
    setIsLoading(true);
    setError(null);
    try {
      await logisticsService.recepcionarOrden(id, detalles);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al procesar la recepción.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { procesarRecepcion, isLoading, error };
};