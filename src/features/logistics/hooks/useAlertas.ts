import { useState } from "react";
import { api } from "../../../config/api";

// src/features/logistics/hooks/useAlertas.ts
export const useAlertas = () => {
  const [alertas, setAlertas] = useState<any[]>([]);

  const verificar = async () => {
    const { data } = await api.get('/api/v1/operations/alertas');
    setAlertas(data);
  };
  
  return { alertas, verificar };
};