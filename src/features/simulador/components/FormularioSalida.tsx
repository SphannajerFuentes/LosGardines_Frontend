import React, { useState } from "react";
import { logisticsService } from "../../logistics/services/logisticsService";

interface FormularioSalidaProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const FormularioSalida: React.FC<FormularioSalidaProps> = ({
  onClose,
  onSuccess,
}) => {
  const [medicamentoId, setMedicamentoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Estructura que espera el backend
      await logisticsService.registrarSalida([
        {
          medicamento_id: Number(medicamentoId),
          cantidad: Number(cantidad),
        },
      ]);
      alert(
        "Venta registrada correctamente. Stock y Lotes actualizados (FEFO).",
      );
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Error al registrar la venta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm animate-in fade-in duration-200">
      <h3 className="font-headline font-bold text-base text-warning mb-4 flex items-center gap-2">
        <span>👇</span> Registrar Venta (Salida FIFO)
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-on-surface-variant mb-1.5">
              ID del Medicamento:
            </label>
            <input
              type="number"
              value={medicamentoId}
              onChange={(e) => setMedicamentoId(e.target.value)}
              placeholder="Ej. 1"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface placeholder:text-outline/50 text-[14px] font-body focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-on-surface-variant mb-1.5">
              Cantidad a Vender:
            </label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ej. 5"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface placeholder:text-outline/50 text-[14px] font-body focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-on-surface-variant font-semibold text-[14px] hover:bg-surface-container transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-[14px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            {loading ? "Procesando..." : "Confirmar Despacho"}
          </button>
        </div>
      </form>
    </div>
  );
};
