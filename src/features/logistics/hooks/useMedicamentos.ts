import { useState } from 'react';
import { medicamentoService } from '../services/medicamentoService';

export const useMedicamentos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);

  const cargarMedicamentos = async () => {
    setIsLoading(true);
    try {
      const data = await medicamentoService.listar();
      setMedicamentos(data);
    } finally {
      setIsLoading(false);
    }
  };

  const guardarMedicamento = async (datos: any) => {
    setIsLoading(true);
    try {
      await medicamentoService.registrar(datos);
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { medicamentos, isLoading, cargarMedicamentos, guardarMedicamento };
};