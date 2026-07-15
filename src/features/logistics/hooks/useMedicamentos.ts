import { useState } from 'react';
import { medicamentoService } from '../services/medicamentoService';

export const useMedicamentos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); 

  const cargarMedicamentos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await medicamentoService.listar();
      setMedicamentos(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "No se pudieron cargar los medicamentos.");
    } finally {
      setIsLoading(false);
    }
  };

  const guardarMedicamento = async (datos: any) => {
    setIsLoading(true);
    setError(null); 
    try {
      await medicamentoService.registrar(datos);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al intentar guardar el medicamento.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { medicamentos, isLoading, error, cargarMedicamentos, guardarMedicamento };
};