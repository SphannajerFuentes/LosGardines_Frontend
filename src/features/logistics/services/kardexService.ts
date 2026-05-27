import { api } from '../../../config/api';

export const kardexService = {
  obtenerMovimientos: async (medicamentoId: number) => {
    const { data } = await api.get(`/api/v1/operations/kardex/${medicamentoId}`);
    return data;
  }
};