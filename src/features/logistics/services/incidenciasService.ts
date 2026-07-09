// src/features/logistics/services/incidenciasService.ts
import { api } from '../../../config/api';

export const incidenciasService = {
  listar: async () => {
    const { data } = await api.get('/api/v1/incidencias/');
    return data;
  },
  resolver: async (id: number) => {
    const { data } = await api.put(`/api/v1/incidencias/${id}/resolver`);
    return data;
  }
};