import { useState } from 'react';
import { medicamentoService } from '../services/medicamentoService';

const extraerMensajeError = (err: any, fallback: string): string => {
  const detail = err.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((d: any) => d.msg).join(", ");
  }
  return detail || fallback;
};

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
      setError(extraerMensajeError(err, "No se pudieron cargar los medicamentos."));
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
      setError(extraerMensajeError(err, "Error al intentar guardar el medicamento."));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { medicamentos, isLoading, error, cargarMedicamentos, guardarMedicamento };
};