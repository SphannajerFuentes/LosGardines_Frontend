import { useState, useEffect } from 'react';
import { api } from '../../../config/api';

export const useKardexDetalle = (medicamentoId: number | null) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchKardex = async () => {
    if (!medicamentoId) return;
    setIsLoading(true);
    try {
      const { data } = await api.get(`/api/v1/operations/kardex/${medicamentoId}`);
      setData(data);
    } catch (e) {
      console.error("Error al cargar kardex", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchKardex(); }, [medicamentoId]);

  return { data, isLoading, refetch: fetchKardex };
};