import React, { useState, useEffect } from 'react';
import { useKardex } from '../hooks/useKardex';
import { useMedicamentos } from '../hooks/useMedicamentos';
import { Loader2,} from 'lucide-react';
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-4 md:space-y-6">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}

      <h2 className="text-xl md:text-2xl font-bold">Auditoría Real de Kardex</h2>
      
      {/* Selector de Medicamento */}
      <select 
        className="w-full md:w-1/2 lg:w-1/3 p-3 border rounded-xl bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base"
        onChange={(e) => handleSelect(e.target.value)}
        value={selectedId} 
      >
        <option value="">Seleccione un medicamento para auditar...</option>
        {medicamentos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
      </select>

      {isLoading && <Loader2 className="animate-spin mx-auto mt-8 w-8 h-8 text-primary" />}
      
      {data && (
        <div className="bg-white rounded-2xl border p-4 md:p-6 shadow-sm">
          <h3 className="text-lg md:text-xl font-bold">{data.nombre}</h3>
          <p className="mt-1 text-sm md:text-base">Stock Actual: <span className="font-bold text-primary">{data.stock_actual} uds</span></p>
          
          <div className="overflow-x-auto mt-4 md:mt-6">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-surface-container-low/40">
                <tr className="border-b text-sm">
                  <th className="p-3 whitespace-nowrap">Fecha</th>
                  <th className="p-3 whitespace-nowrap">Tipo</th>
                  <th className="p-3 whitespace-nowrap">Cantidad</th>
                  <th className="p-3 whitespace-nowrap">Lote</th>
                  <th className="p-3 whitespace-nowrap">Motivo</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {data.historial.map((reg) => (
                  <tr key={reg.id} className="border-b hover:bg-surface-container-lowest transition-colors">
                    <td className="p-3 whitespace-nowrap text-on-surface-variant">{new Date(reg.fecha_movimiento).toLocaleDateString()}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${reg.tipo_movimiento === 'INGRESO' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {reg.tipo_movimiento}
                      </span>
                    </td>
                    <td className="p-3 font-medium whitespace-nowrap">{reg.cantidad}</td>
                    <td className="p-3 font-mono text-xs md:text-sm whitespace-nowrap">{reg.lote_codigo || reg.numero_lote}</td>
                    <td className="p-3 text-sm text-gray-600 min-w-[150px]">{reg.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};