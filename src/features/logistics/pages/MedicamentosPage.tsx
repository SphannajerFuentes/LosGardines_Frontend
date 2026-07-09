import React, { useEffect, useState } from "react";
import { useMedicamentos } from "../hooks/useMedicamentos";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";

export const MedicamentosPage: React.FC = () => {
  const { medicamentos, isLoading, error: errorHook, cargarMedicamentos, guardarMedicamento } =
    useMedicamentos();
    
  const [form, setForm] = useState({
    nombre: "",
    principio_activo: "",
    presentacion: "",
    precio: 0,
    stock_maximo: 0,
    stock_minimo: 0,
    punto_reorden: 0,
    categoria_abc: "A",
  });

  // Estados locales de control para notificaciones
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  // Sincronizar errores del hook
  useEffect(() => {
    if (errorHook) setMsgError(errorHook);
  }, [errorHook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgError(null);
    setMsgSuccess(null);
    
    const exito = await guardarMedicamento(form);
    if (exito) {
      setMsgSuccess(`Medicamento "${form.nombre}" registrado exitosamente en el catálogo.`);
      cargarMedicamentos(); // Recargar lista
    }
  };

  return (
    <div className="space-y-8">
      {/* 🔔 Panel Dinámico de Notificaciones */}
      <div className="space-y-4">
        {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}
        {msgSuccess && <NotificacionFeedback mensaje={msgSuccess} tipo="success" onClose={() => setMsgSuccess(null)} />}
      </div>

      {/* FORMULARIO COMPACTO EN GRID */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-on-surface">
          <Plus className="w-5 h-5 text-primary" /> Registrar Nuevo Medicamento
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Nombre Comercial</label>
            <input className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="Ej. Paracetamol" onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Principio Activo</label>
            <input className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="Ej. Acetaminofén" onChange={(e) => setForm({ ...form, principio_activo: e.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Presentación</label>
            <input className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="Ej. Caja x 100" onChange={(e) => setForm({ ...form, presentacion: e.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Categoría ABC</label>
            <select className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" value={form.categoria_abc} onChange={(e) => setForm({ ...form, categoria_abc: e.target.value })}>
              <option value="A">Clase A (Alta Rotación)</option>
              <option value="B">Clase B (Media Rotación)</option>
              <option value="C">Clase C (Baja Rotación)</option>
            </select>
          </div>
          
          {/* Fila de controles numéricos */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Precio (S/)</label>
            <input type="number" step="0.01" className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="0.00" onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Stock Mínimo</label>
            <input type="number" className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="0" onChange={(e) => setForm({ ...form, stock_minimo: Number(e.target.value) })} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-on-surface-variant">Stock Máximo</label>
            <input type="number" className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" placeholder="0" onChange={(e) => setForm({ ...form, stock_maximo: Number(e.target.value) })} required />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white py-2.5 rounded-xl font-bold text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all flex justify-center items-center gap-2">
              Guardar Medicamento
            </button>
          </div>
        </form>
      </div>

      {/* TABLA DE DATOS */}
      <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant/30 bg-surface-container-lowest flex justify-between items-center">
          <h3 className="font-bold text-on-surface text-sm">Inventario Actual</h3>
        </div>
        
        {isLoading ? (
          <div className="p-12 flex justify-center items-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : medicamentos.length === 0 ? (
          <div className="p-12 flex flex-col items-center text-outline text-sm">
            <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
            <p>No hay medicamentos registrados en el catálogo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-low/50 text-on-surface-variant">
                <tr>
                  <th className="p-4 font-semibold whitespace-nowrap">Código / Nombre</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Presentación</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Categoría</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-right">Precio</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Estado Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {medicamentos.map((m) => {
                  const isLowStock = m.stock_actual <= m.stock_minimo;
                  return (
                    <tr key={m.id} className="hover:bg-surface-container-lowest transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-on-surface">{m.nombre}</div>
                        <div className="text-xs text-outline">{m.principio_activo}</div>
                      </td>
                      <td className="p-4 text-on-surface-variant">{m.presentacion}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                          m.categoria_abc === "A" ? "bg-emerald-100 text-emerald-800" : 
                          m.categoria_abc === "B" ? "bg-blue-100 text-blue-800" : 
                          "bg-slate-100 text-slate-800"
                        }`}>
                          Clase {m.categoria_abc}
                        </span>
                      </td>
                      <td className="p-4 text-right font-medium">S/ {Number(m.precio).toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          isLowStock ? "bg-error/10 text-error ring-1 ring-error/20" : "bg-success/10 text-success ring-1 ring-success/20"
                        }`}>
                          {isLowStock && <AlertCircle className="w-3 h-3" />}
                          {m.stock_actual} uds
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};