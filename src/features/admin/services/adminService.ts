// src/features/admin/services/adminService.ts
import { api } from "../../../config/api";

export interface UsuarioInput {
  nombre: string;
  contrasena: string;
  rol: number; // 1: Admin, 2: Almacenero, 3: Farmacéutico
}

export interface ProveedorInput {
  nombre: string;
  contacto: string;
  telefono: string;
}

export const adminService = {
  registrarUsuario: async (datos: UsuarioInput) => {
    const { data } = await api.post('/api/v1/admin/usuarios', datos);
    return data;
  },
  listarUsuarios: async () => {
    const { data } = await api.get('/api/v1/admin/usuarios'); 
    return data;
  },

  registrarProveedor: async (datos: ProveedorInput) => {
    // CORREGIDO: ahora recibimos y enviamos 'datos' correctamente
    const { data } = await api.post('/api/v1/admin/proveedores', datos);
    return data;
  },

  listarProveedores: async () => {
    const { data } = await api.get('/api/v1/admin/proveedores'); 
    return data;
  },

};
