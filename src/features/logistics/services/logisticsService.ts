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
  getOrdenDetalle: async (id: number) => {
    const { data } = await api.get(`/api/v1/ordenes-compras/${id}/detalle`);
    return data;
  },

  recepcionarOrden: async (id: number, detalles: RecepcionDetalle[]) => {
    const { data } = await api.put(
      `/api/v1/ordenes-compras/${id}/recepcionar`,
      { detalles },
    );
    return data;
  },

  crearOrden: async (datos: {
    id_proveedor: number;
    fecha_emision: string;
    detalles: any[];
  }) => {
    return await api.post("/api/v1/ordenes-compras/", datos);
  },

  registrarSalida: async (items: { medicamento_id: number; cantidad: number }[]) => {
    // El backend espera: { "items": [ { "medicamento_id": 1, "cantidad": 5 } ] }
    const { data } = await api.post("/api/v1/operations/salida", { items });
    return data;
  },
};
