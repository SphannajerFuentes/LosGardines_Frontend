// src/features/logistics/hooks/useIncidencias.ts
import { useState, useEffect } from 'react';
import { incidenciasService } from '../services/incidenciasService';

export const useIncidencias = () => {
  const [incidencias, setIncidencias] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const cargarIncidencias = async () => {
    setIsLoading(true);
    try {
      const data = await incidenciasService.listar();
      setIncidencias(data);
    } finally {
      setIsLoading(false);
    }
  };

  const marcarComoResuelta = async (id: number) => {
    try {
      await incidenciasService.resolver(id);
      cargarIncidencias(); // Recargamos la lista
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => { cargarIncidencias(); }, []);

  return { incidencias, isLoading, marcarComoResuelta };
};