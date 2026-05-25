// src/features/admin/hooks/useGestionUsuarios.ts
import { useState } from 'react';
import { adminService, type UsuarioInput, } from '../services/adminService';

export const useGestionUsuarios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registrar = async (datos: UsuarioInput, resetForm: () => void) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await adminService.registrarUsuario(datos);
      setSuccessMessage(response.mensaje || "Usuario registrado exitosamente.");
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registrar, isLoading, error, successMessage, setError, setSuccessMessage };
};