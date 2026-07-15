import { api } from '../../../config/api';

export const medicamentoService = {
  listar: async () => {
    const { data } = await api.get('/api/v1/medicamentos/');
    return data;
  },
  registrar: async (datos: any) => {
    const { data } = await api.post('/api/v1/medicamentos/', datos);
    return data;
  }
};