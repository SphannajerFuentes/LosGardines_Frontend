import React, { useEffect, useState } from "react";
import { useMedicamentos } from "../../logistics/hooks/useMedicamentos";
import { Loader2, Plus } from "lucide-react";

export const MedicamentosPage: React.FC = () => {
  const { medicamentos, isLoading, cargarMedicamentos, guardarMedicamento } =
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

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await guardarMedicamento(form);
    if (exito) {
      alert("Medicamento registrado");
      cargarMedicamentos(); // Recargar lista
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Catálogo de Medicamentos</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border mb-8 grid grid-cols-2 gap-4"
      >
        <input
          className="p-2 border rounded"
          placeholder="Nombre"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Principio Activo"
          onChange={(e) =>
            setForm({ ...form, principio_activo: e.target.value })
          }
        />
        <input
          className="p-2 border rounded"
          placeholder="Presentación"
          onChange={(e) => setForm({ ...form, presentacion: e.target.value })}
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Precio"
          onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
        />

        {/* Nuevos campos de control de stock */}
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Stock Máximo"
          onChange={(e) =>
            setForm({ ...form, stock_maximo: Number(e.target.value) })
          }
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Stock Mínimo"
          onChange={(e) =>
            setForm({ ...form, stock_minimo: Number(e.target.value) })
          }
        />
        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Punto de Reorden"
          onChange={(e) =>
            setForm({ ...form, punto_reorden: Number(e.target.value) })
          }
        />

        {/* Selector de Categoría ABC */}
        <select
          className="p-2 border rounded"
          value={form.categoria_abc}
          onChange={(e) => setForm({ ...form, categoria_abc: e.target.value })}
        >
          <option value="A">Categoría A</option>
          <option value="B">Categoría B</option>
          <option value="C">Categoría C</option>
        </select>

        <button className="col-span-2 bg-primary text-white py-2 rounded font-bold">
          Guardar Medicamento
        </button>
      </form>

      {/* Tabla mejorada */}
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <table className="w-full bg-white rounded-xl border shadow-sm">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Presentación</th>
              <th className="p-4 text-left">Categoría</th> {/* Nueva columna */}
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">Stock Actual</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-4 font-semibold">{m.nombre}</td>
                <td className="p-4 text-sm text-outline">{m.presentacion}</td>

                {/* Badge de Categoría */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      m.categoria_abc === "A"
                        ? "bg-amber-100 text-amber-800"
                        : m.categoria_abc === "B"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {m.categoria_abc}
                  </span>
                </td>

                <td className="p-4">S/ {Number(m.precio).toFixed(2)}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      m.stock_actual < m.stock_minimo
                        ? "bg-error-container text-error"
                        : "bg-success-container text-success"
                    }`}
                  >
                    {m.stock_actual}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
