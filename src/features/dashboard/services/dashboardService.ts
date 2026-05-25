// src/features/dashboard/services/dashboardService.ts
import { api } from '../../../config/api';

export const dashboardService = {
  getKPIs: async () => {
    // Agregamos el prefijo /api/v1 para que FastAPI encuentre el endpoint
    const { data } = await api.get('/api/v1/dashboard/kpis');
    return data;
  },
  
  getAlerts: async () => {
    // Agregamos el prefijo /api/v1 aquí también
    const { data } = await api.get('/api/v1/dashboard/alertas');
    return data;
  }
};