import React, { useState, useEffect } from 'react';
import { useKardex } from '../hooks/useKardex';
import { useMedicamentos } from '../hooks/useMedicamentos';
import { Loader2, Search, AlertCircle } from 'lucide-react';
import { NotificacionFeedback } from '../../../components/NotificacionFeedback';

export const KardexPage: React.FC = () => {
  const { data, isLoading, buscarMovimientos, error: errorKardex } = useKardex();
  const { medicamentos, cargarMedicamentos, error: errorMed } = useMedicamentos();
  const [selectedId, setSelectedId] = useState<number | ''>('');
  
  // Estado para capturar errores de cualquiera de los dos hooks
  const [msgError, setMsgError] = useState<string | null>(null);

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  // Sincronizamos los posibles errores de los hooks
  useEffect(() => {
    if (errorKardex) setMsgError(errorKardex);
    if (errorMed) setMsgError(errorMed);
  }, [errorKardex, errorMed]);

  const handleSelect = (id: string) => {
    const numId = Number(id);
    setSelectedId(numId);
    buscarMovimientos(numId);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}

      <h2 className="text-2xl font-bold">Auditoría Real de Kardex</h2>
      
      {/* Selector de Medicamento */}
      <select 
        className="w-full md:w-1/3 p-3 border rounded-xl"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="">Seleccione un medicamento para auditar...</option>
        {medicamentos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
      </select>

      {isLoading && <Loader2 className="animate-spin mx-auto" />}
      
      {data && (
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="text-xl font-bold">{data.nombre}</h3>
          <p>Stock Actual: <span className="font-bold text-primary">{data.stock_actual} uds</span></p>
          
          <table className="w-full mt-6 text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Fecha</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Lote</th>
                <th className="p-3">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {data.historial.map((reg) => (
                <tr key={reg.id} className="border-b">
                  <td className="p-3">{new Date(reg.fecha_movimiento).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${reg.tipo_movimiento === 'INGRESO' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {reg.tipo_movimiento}
                    </span>
                  </td>
                  <td className="p-3">{reg.cantidad}</td>
                  <td className="p-3 font-mono">{reg.lote_codigo || reg.numero_lote}</td>
                  <td className="p-3 text-sm text-gray-600">{reg.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};