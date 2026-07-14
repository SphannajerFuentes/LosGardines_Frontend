import React, { useState, useEffect } from "react";
import { logisticsService } from "../../logistics/services/logisticsService";
import { useRecepcion } from "../hooks/useRecepcion";
import { PackageCheck, Loader2, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";

export const RecepcionPage: React.FC = () => {
  const [ordenes, setOrdenes] = useState<any[]>([]);
  const [selectedOrden, setSelectedOrden] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const { procesarRecepcion, isLoading } = useRecepcion();

  // Estados locales para capturar feedback
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  useEffect(() => {
    logisticsService.getOrdenesPendientes().then(setOrdenes);
  }, []);

  const handleSelect = async (orden: any) => {
    setSelectedOrden(orden);
    const detalle = await logisticsService.getOrdenDetalle(orden.id);
    const fecha = new Date();
    const mesAnio = `${(fecha.getMonth() + 1).toString().padStart(2, "0")}${fecha.getFullYear().toString().slice(-2)}`;

    setItems(
      detalle.map((d: any) => ({
        ...d,
        cantidad_pedida: d.cantidad,
        numero_lote: `LT-${d.id_medicamento}-${mesAnio}-${Math.floor(Math.random() * 900 + 100)}`,
        fecha_caducidad: "",
        cantidad_recibida: d.cantidad,
        tipo_incidencia: 2,
      }))
    );
  };

  const handleUpdateItem = (index: number, campo: string, valor: any) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] = valor;
    
    if (campo === 'cantidad_recibida' && valor === 0) {
      nuevosItems[index].numero_lote = "N/A";
      nuevosItems[index].fecha_caducidad = new Date().toISOString().split("T")[0];
    }
    
    setItems(nuevosItems);
  };

  const handleRecepcion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrden) return;
    
    setMsgError(null);
    setMsgSuccess(null);
    
    const exito = await procesarRecepcion(selectedOrden.id, items);
    if (exito) {
      setMsgSuccess(`Recepción de Orden N°${selectedOrden.id} procesada. Inventario e incidencias actualizados de forma conforme.`);
      setSelectedOrden(null);
      setItems([]);
      logisticsService.getOrdenesPendientes().then(setOrdenes);
    } else {
      setMsgError("Ocurrió un inconveniente al registrar la recepción de mercadería.");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      <div className="space-y-4">
        {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}
        {msgSuccess && <NotificacionFeedback mensaje={msgSuccess} tipo="success" onClose={() => setMsgSuccess(null)} />}
      </div>

      <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><PackageCheck className="w-6 h-6" /></div>
        Recepción de Mercadería
      </h2>

      {!selectedOrden ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ordenes.map((o) => (
            <div key={o.id} className="bg-white p-5 rounded-2xl border cursor-pointer hover:border-primary transition-all shadow-sm" onClick={() => handleSelect(o)}>
              <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">Orden #{o.id}</span>
              <h3 className="font-bold mt-3 text-lg">{o.proveedor_nombre}</h3>
              <ArrowRight className="w-5 h-5 text-outline mt-3" />
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleRecepcion} className="space-y-6">
          <button type="button" onClick={() => setSelectedOrden(null)} className="flex items-center text-primary font-bold hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1"/> Volver a las Órdenes
          </button>

          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
            <h3 className="font-bold text-xl border-b pb-4">Validación: Orden #{selectedOrden.id}</h3>

            {items.map((item, index) => {
              const diferencia = item.cantidad_pedida - item.cantidad_recibida;
              const tieneIncidencia = diferencia > 0;

              return (
                <div key={index} className={`p-5 rounded-xl border ${tieneIncidencia ? 'border-warning bg-warning/5' : 'bg-surface-container-lowest border-outline-variant/50'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div>
                      <label className="text-xs font-bold text-outline uppercase">Medicamento (Ped: {item.cantidad_pedida})</label>
                      <div className="font-bold text-on-surface mt-1">{item.medicamento_nombre}</div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-outline uppercase">Llegaron Buenas</label>
                      <input required type="number" min="0" max={item.cantidad_pedida} value={item.cantidad_recibida} className="w-full p-2.5 border border-outline-variant/50 rounded-lg mt-1 font-bold text-primary" onChange={e => handleUpdateItem(index, 'cantidad_recibida', Number(e.target.value))} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-outline uppercase">Lote (Para las buenas)</label>
                      <input required disabled={item.cantidad_recibida === 0} value={item.numero_lote} className="w-full p-2.5 border border-outline-variant/50 rounded-lg mt-1 disabled:opacity-50" onChange={e => handleUpdateItem(index, 'numero_lote', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-outline uppercase">Vencimiento</label>
                      <input required type="date" disabled={item.cantidad_recibida === 0} className="w-full p-2.5 border border-outline-variant/50 rounded-lg mt-1 disabled:opacity-50" onChange={e => handleUpdateItem(index, 'fecha_caducidad', e.target.value)} />
                    </div>
                  </div>

                  {tieneIncidencia && (
                    <div className="mt-4 pt-4 border-t border-warning/20 flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex items-center gap-2 text-warning font-bold shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Faltan {diferencia} uds.</span>
                      </div>
                      <div className="flex-1 w-full flex items-center gap-3">
                        <span className="text-sm text-on-surface-variant font-medium">Motivo del rechazo/falta:</span>
                        <select className="flex-1 p-2 border border-warning/40 rounded-lg text-sm bg-white" value={item.tipo_incidencia} onChange={e => handleUpdateItem(index, 'tipo_incidencia', Number(e.target.value))}>
                          <option value={1}>Llegaron Dañadas / Rotas</option>
                          <option value={2}>Faltante (No lo enviaron)</option>
                          <option value={3}>Llegaron Vencidas / Caducadas</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button disabled={isLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirmar Recepción y Auditar Faltantes"}
          </button>
        </form>
      )}
    </div>
  );
};