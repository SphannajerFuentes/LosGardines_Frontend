import React, { useState, useEffect } from "react";
import { logisticsService } from "../services/logisticsService";
import { useIncidencias } from "../hooks/useIncidencias";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";

export const IncidenciasPage: React.FC = () => {
  const [ordenes, setOrdenes] = useState<any[]>([]);
  const [selectedOrden, setSelectedOrden] = useState<any>(null);
  const { registrarIncidencia, isLoading } = useIncidencias();
  const [form, setForm] = useState({ desc: "", tipo: 1 });

  useEffect(() => {
    logisticsService.getOrdenes().then(setOrdenes);
  }, []);

  const handleSelect = (orden: any) => setSelectedOrden(orden);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrden) return;

    const exito = await registrarIncidencia({
      id_orden_compra: selectedOrden.id,
      id_proveedor: selectedOrden.proveedor_id,
      descripcion: form.desc,
      tipo: form.tipo,
    });
    if (exito) {
      alert("Incidencia reportada");
      setSelectedOrden(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Gestionar Incidencias</h2>

      {/* TABLA DE SELECCIÓN */}
      <div className="bg-white rounded-2xl border shadow-sm mb-8 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Proveedor</th>
              <th className="p-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((o) => (
              <tr
                key={o.id}
                className="border-t hover:bg-surface-container-lowest"
              >
                <td className="p-4">{o.id}</td>
                <td className="p-4">{o.proveedor_nombre}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleSelect(o)}
                    className="text-primary font-bold"
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULARIO CONDICIONAL */}
      {selectedOrden && (
        <form
          onSubmit={enviar}
          className="bg-surface-container-lowest p-6 rounded-2xl border space-y-4"
        >
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Package className="text-primary" /> Incidencia para:{" "}
            {selectedOrden.proveedor_nombre} (Orden #{selectedOrden.id})
          </h3>
          <textarea
            className="w-full p-3 border rounded-xl"
            placeholder="Describe el detalle del problema..."
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <select
            className="w-full p-3 border rounded-xl"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: Number(e.target.value) })}
          >
            <option value={1}>Producto Dañado</option>
            <option value={2}>Discrepancia / Faltante</option>
            <option value={3}>Producto Vencido</option>
          </select>
          <button className="w-full bg-error text-white py-3 rounded-xl">
            Confirmar Reporte
          </button>
        </form>
      )}
    </div>
  );
};
