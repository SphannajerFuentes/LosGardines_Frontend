// src/features/logistics/hooks/useIncidencias.ts
import { useState } from 'react';
import { api } from '../../../config/api';

export const useIncidencias = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cambiamos tipo: string a tipo: number
  const registrarIncidencia = async (datos: { 
    id_orden_compra: number, 
    id_proveedor: number, 
    descripcion: string, 
    tipo: number 
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/v1/incidencias/', datos);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al reportar la incidencia.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registrarIncidencia, isLoading, error };
};