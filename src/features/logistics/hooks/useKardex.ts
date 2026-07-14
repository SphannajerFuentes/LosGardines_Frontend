import { useState } from 'react';
import { kardexService } from '../services/kardexService';
import type { KardexResponse } from '../../simulador/types';


export const useKardex = () => {
  const [data, setData] = useState<KardexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarMovimientos = async (medicamentoId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await kardexService.obtenerMovimientos(medicamentoId);
      setData(result);
    } catch (err: any) {
      setError("No se pudo cargar el historial del Kardex.");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, buscarMovimientos };
};