import React, { useState, useEffect } from "react";
import { useMedicamentos } from "../hooks/useMedicamentos";
import { useIngresos } from "../hooks/useIngresos";
import { Loader2 } from "lucide-react";

export const IngresoStockPage: React.FC = () => {
  const { medicamentos, cargarMedicamentos } = useMedicamentos();
  const { registrarIngreso, isLoading } = useIngresos();

  const [form, setForm] = useState({
    id_medicamento: "",
    numero_lote: "",
    cantidad: 0,
    fecha_caducidad: "",
  });

  useEffect(() => {
    cargarMedicamentos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await registrarIngreso({
      ...form,
      cantidad: Number(form.cantidad),
      id_medicamento: Number(form.id_medicamento),
    });

    if (exito) {
      alert("Lote e inventario actualizados con éxito");
      setForm({
        id_medicamento: "",
        numero_lote: "",
        cantidad: 0,
        fecha_caducidad: "",
      });
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Ingreso de Lote al Inventario</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border space-y-4"
      >
        <select
          required
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, id_medicamento: e.target.value })}
        >
          <option value="">Seleccione Medicamento</option>
          {medicamentos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        <input
          required
          className="w-full p-3 border rounded-xl"
          placeholder="Número de Lote"
          onChange={(e) => setForm({ ...form, numero_lote: e.target.value })}
        />
        <input
          required
          type="number"
          className="w-full p-3 border rounded-xl"
          placeholder="Cantidad"
          onChange={(e) =>
            setForm({ ...form, cantidad: Number(e.target.value) })
          }
        />
        <input
          required
          type="date"
          className="w-full p-3 border rounded-xl"
          onChange={(e) =>
            setForm({ ...form, fecha_caducidad: e.target.value })
          }
        />

        <button
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 rounded-xl font-bold"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Registrar Ingreso"
          )}
        </button>
      </form>
    </div>
  );
};
