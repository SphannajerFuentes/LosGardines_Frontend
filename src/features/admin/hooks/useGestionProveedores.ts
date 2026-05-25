// src/features/admin/hooks/useGestionProveedores.ts
import { useState } from 'react';
import { adminService, type ProveedorInput,  } from '../services/adminService';

export const useGestionProveedores = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  return { registrar, isLoading, error, success, setError, setSuccess };
};