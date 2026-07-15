// src/features/admin/hooks/useGestionUsuarios.ts
import { useState, useEffect } from 'react';
import { adminService, type UsuarioInput } from '../services/adminService';

export const useGestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const cargarUsuarios = async () => {
    try {
      const data = await adminService.listarUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios", err);
    }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const registrar = async (datos: UsuarioInput, resetForm: () => void) => {
    setIsLoading(true);
    setError(null);
    try {
      await adminService.registrarUsuario(datos);
      setSuccessMessage("Usuario registrado exitosamente.");
      resetForm();
      cargarUsuarios(); // Recargamos la lista tras registrar
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registrar, cargarUsuarios, usuarios, isLoading, error, successMessage, setError, setSuccessMessage };
};