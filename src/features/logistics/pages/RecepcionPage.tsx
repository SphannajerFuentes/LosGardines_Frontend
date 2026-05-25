import React, { useState, useEffect } from 'react';
import { logisticsService } from '../services/logisticsService';
import { medicamentoService } from '../services/medicamentoService';
import { useRecepcion } from '../hooks/useRecepcion';
import { PackageCheck, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

export const RecepcionPage: React.FC = () => {
  const [ordenes, setOrdenes] = useState<any[]>([]);
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [selectedOrden, setSelectedOrden] = useState<any>(null);
  const { procesarRecepcion, isLoading } = useRecepcion();
  
  // Estado para el formulario de recepción
  const [formData, setFormData] = useState({ 
    id_medicamento: '', lote: '', cantidad: 0, fecha: '' 
  });

  useEffect(() => {
    // Cargar datos necesarios al montar
    const loadData = async () => {
      const [listaOrdenes, listaMedicamentos] = await Promise.all([
        logisticsService.getOrdenesPendientes(),
        medicamentoService.listar()
      ]);
      setOrdenes(listaOrdenes);
      setMedicamentos(listaMedicamentos);
    };
    loadData();
  }, []);

  const handleRecepcion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrden) return;
    
    const exito = await procesarRecepcion(selectedOrden.id, [{
      id_medicamento: Number(formData.id_medicamento),
      numero_lote: formData.lote,
      cantidad_recibida: formData.cantidad,
      fecha_caducidad: formData.fecha
    }]);

    if (exito) {
      alert("¡Recepción completada correctamente!");
      setSelectedOrden(null);
      setFormData({ id_medicamento: '', lote: '', cantidad: 0, fecha: '' });
      // Recargar lista
      logisticsService.getOrdenesPendientes().then(setOrdenes);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PackageCheck className="text-primary" /> Recepción de Mercadería
      </h2>

      {!selectedOrden ? (
        /* LISTADO DE ORDENES PENDIENTES */
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {ordenes.length > 0 ? ordenes.map(o => (
            <div key={o.id} className="p-4 border-b hover:bg-surface-container-low flex justify-between items-center">
              <div>
                <p className="font-bold">Orden #{o.id}</p>
                <p className="text-sm text-outline">Proveedor: {o.proveedor_nombre}</p>
              </div>
              <button 
                onClick={() => setSelectedOrden(o)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Procesar
              </button>
            </div>
          )) : (
            <div className="p-8 text-center text-outline">
              <AlertCircle className="mx-auto mb-2 text-primary" />
              No hay órdenes pendientes de recepción.
            </div>
          )}
        </div>
      ) : (
        /* FORMULARIO DE RECEPCIÓN */
        <form onSubmit={handleRecepcion} className="bg-surface-container-lowest p-6 rounded-2xl border space-y-4">
          <button type="button" onClick={() => setSelectedOrden(null)} className="flex items-center text-primary text-sm font-bold">
            <ArrowLeft className="w-4 h-4 mr-1"/> Volver a la lista
          </button>
          
          <h3 className="font-bold text-lg">Recepción: Orden #{selectedOrden.id}</h3>
          
          <select 
            required
            className="w-full p-3 border rounded-xl bg-white"
            onChange={e => setFormData({...formData, id_medicamento: e.target.value})}
          >
            <option value="">Seleccione el medicamento</option>
            {medicamentos.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
          
          <input type="text" required placeholder="Número de Lote" className="w-full p-3 border rounded-xl" 
            onChange={e => setFormData({...formData, lote: e.target.value})} />
          
          <input type="number" required min="1" placeholder="Cantidad Recibida" className="w-full p-3 border rounded-xl" 
            onChange={e => setFormData({...formData, cantidad: Number(e.target.value)})} />
          
          <input type="date" required className="w-full p-3 border rounded-xl" 
            onChange={e => setFormData({...formData, fecha: e.target.value})} />

          <button disabled={isLoading} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Confirmar Recepción"}
          </button>
        </form>
      )}
    </div>
  );
};