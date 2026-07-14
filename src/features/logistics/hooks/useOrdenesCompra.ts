import { useState } from 'react';
import { logisticsService } from '../services/logisticsService';

export const useOrdenesCompra = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emitirOrden = async (datos: { id_proveedor: number, fecha_emision: string, detalles: any[] }) => {
    setIsLoading(true);
    setError(null);
    try {
      await logisticsService.crearOrden(datos);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al emitir la orden.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { emitirOrden, isLoading, error };
};