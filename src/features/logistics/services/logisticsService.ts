// src/features/logistics/services/logisticsService.ts
import { api } from "../../../config/api";

export interface RecepcionDetalle {
  id_medicamento: number;
  cantidad_recibida: number;
  numero_lote: string;
  fecha_caducidad: string;
}

export const logisticsService = {
  // Obtener órdenes pendientes (tendrías que crear este endpoint en FastAPI pronto)

  getOrdenes: async () => {
    // Ajusta la URL según tu backend, debe incluir los datos del proveedor
    const { data } = await api.get("/api/v1/ordenes-compras/");
    return data;
  },

  getOrdenesPendientes: async () => {
    const { data } = await api.get("/api/v1/ordenes-compras?estado=1");
    return data;
  },

  recepcionarOrden: async (id: number, detalles: RecepcionDetalle[]) => {
    const { data } = await api.put(
      `/api/v1/ordenes-compras/${id}/recepcionar`,
      { detalles },
    );
    return data;
  },
};
