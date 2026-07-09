import { api } from '../../../config/api';

export const dashboardService = {
  getKPIs: async () => {
    // Apuntamos a la nueva ruta que acabamos de crear en OperacionesController
    const { data } = await api.get('/api/v1/operations/dashboard/kpis');
    return data;
  },
  
  getAlerts: async () => {
    const { data } = await api.get('/api/v1/operations/alertas'); 
    return data;
  }
};