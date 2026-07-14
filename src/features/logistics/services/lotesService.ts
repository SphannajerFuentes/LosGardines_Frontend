import { api } from "../../../config/api";

export const lotesService = {
  listarActivosFefo: async () => {
    const { data } = await api.get('/api/v1/operations/lotes/fefo');
    return data;
  }
};