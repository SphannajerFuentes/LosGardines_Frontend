import { useState } from 'react';
import { api } from '../../../config/api';

export const useIngresos = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registrarIngreso = async (datos: any) => {
    setIsLoading(true);
    try {
      await api.post('/api/v1/ingresos/', datos);
      return true;
    } catch (err) {
      console.error("Error al registrar ingreso", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { registrarIngreso, isLoading };
};