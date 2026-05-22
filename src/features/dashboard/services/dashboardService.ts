import { api } from '../../../config/api';

export const dashboardService = {
  getKPIs: async () => {
    const { data } = await api.get('/dashboard/kpis');
    return data;
  },
  getAlerts: async () => {
    const { data } = await api.get('/dashboard/alertas');
    return data;
  }
};