import React, { useState, useEffect } from "react";
import { useMedicamentos } from "../hooks/useMedicamentos";
import { useOrdenesCompra } from "../hooks/useOrdenesCompra";
import { Plus, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useGestionProveedores } from "../../admin/hooks/useGestionProveedores";
import { NotificacionFeedback } from "../../../components/NotificacionFeedback";

export const CrearOrdenPage: React.FC = () => {
  const { medicamentos, cargarMedicamentos } = useMedicamentos();
  const { proveedores, cargarProveedores } = useGestionProveedores();
  const { emitirOrden, isLoading } = useOrdenesCompra();

  const [detalles, setDetalles] = useState<any[]>([]);
  const [proveedorId, setProveedorId] = useState("");

  // Estados para notificaciones
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  useEffect(() => {
    cargarMedicamentos();
    cargarProveedores();
  }, []);

  const agregarFila = () => {
    setDetalles([
      ...detalles,
      { id_medicamento: "", cantidad: 1, precio_unitario: 0 },
    ]);
  };

  const manejarCambio = (index: number, campo: string, valor: any) => {
    const nuevosDetalles = [...detalles];

    if (campo === "id_medicamento") {
      const med = medicamentos.find((m) => m.id === Number(valor));
      nuevosDetalles[index]["id_medicamento"] = Number(valor);
      nuevosDetalles[index]["precio_unitario"] = med ? Number(med.precio) : 0;
    } else {
      // Evitar negativos en cantidad y precio
      let numValor = Number(valor);
      if (campo === "cantidad" && numValor < 1) numValor = 1; // Mínimo 1
      if (campo === "precio_unitario" && numValor < 0) numValor = 0; // Mínimo 0

      nuevosDetalles[index][campo] =
        campo === "cantidad" || campo === "precio_unitario" ? numValor : valor;
    }

    setDetalles(nuevosDetalles);
  };

  const enviarOrden = async () => {
    if (!proveedorId || detalles.length === 0) {
      return setMsgError("Completa el proveedor y al menos un producto.");
    }

    const exito = await emitirOrden({
      id_proveedor: Number(proveedorId),
      fecha_emision: new Date().toISOString().split("T")[0],
      detalles,
    });

    if (exito) {
      setMsgSuccess("Orden emitida con éxito");
      setDetalles([]);
      setProveedorId("");
    } else {
      setMsgError("Error al emitir la orden.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart /> Emitir Pedido
      </h2>

      {/* 🔔 Panel Dinámico de Notificaciones */}
      <div className="space-y-4">
        {msgError && (
          <NotificacionFeedback
            mensaje={msgError}
            tipo="error"
            onClose={() => setMsgError(null)}
          />
        )}
        {msgSuccess && (
          <NotificacionFeedback
            mensaje={msgSuccess}
            tipo="success"
            onClose={() => setMsgSuccess(null)}
          />
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <label className="block font-bold">Seleccionar Proveedor</label>
        <select
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setProveedorId(e.target.value)}
          value={proveedorId}
        >
          <option value="">Seleccione un proveedor...</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-outline">
              <th className="p-2">Medicamento</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Precio Unit.</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((d, i) => (
              <tr key={i}>
                <td className="p-2">
                  <select
                    className="w-full p-2 border rounded-lg"
                    onChange={(e) =>
                      manejarCambio(i, "id_medicamento", e.target.value)
                    }
                    value={d.id_medicamento}
                  >
                    <option value="">Seleccione...</option>
                    {medicamentos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input 
                    type="number" 
                    min="1" 
                    className="w-20 p-2 border rounded-lg" 
                    value={d.cantidad} 
                    onChange={e => manejarCambio(i, "cantidad", e.target.value)} 
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    className="w-24 p-2 border rounded-lg" 
                    value={d.precio_unitario} 
                    onChange={e => manejarCambio(i, "precio_unitario", e.target.value)} 
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      setDetalles(detalles.filter((_, idx) => idx !== i))
                    }
                  >
                    <Trash2 className="text-error" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={agregarFila}
          className="flex items-center gap-2 text-primary font-bold"
        >
          <Plus /> Agregar ítem
        </button>
        <button
          onClick={enviarOrden}
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 flex justify-center hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Confirmar y Emitir Pedido"
          )}
        </button>
      </div>
    </div>
  );
};
