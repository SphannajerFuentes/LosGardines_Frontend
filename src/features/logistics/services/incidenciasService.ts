// src/features/logistics/services/incidenciasService.ts
import { api } from '../../../config/api';

export const incidenciasService = {
  crearIncidencia: async (datos: any) => {
    return await api.post('/api/v1/incidencias/', datos);
  }
};