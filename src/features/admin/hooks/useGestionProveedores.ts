// src/features/admin/hooks/useGestionProveedores.ts
import { useEffect, useState } from 'react';
import { adminService, type ProveedorInput,  } from '../services/adminService';

export const useGestionProveedores = () => {
  const [proveedores, setProveedores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const cargarProveedores = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.listarProveedores();
      setProveedores(data);
    } catch (err) {
      console.error("Error al cargar proveedores", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { cargarProveedores(); }, []);

  const registrar = async (datos: ProveedorInput, resetForm: () => void) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await adminService.registrarProveedor(datos);
      setSuccess(res.mensaje || "Proveedor registrado correctamente.");
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al registrar el proveedor.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registrar, isLoading, error, success, setError, setSuccess,proveedores, cargarProveedores };
};