import React, { useState, useEffect } from 'react';
import { logisticsService } from '../../logistics/services/logisticsService';
import { medicamentoService } from '../../logistics/services/medicamentoService';
import { Loader2, PackageSearch, ShoppingCart, Minus, Plus, CheckCircle2 } from 'lucide-react';

export const SimuladorKardexPage: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<any[]>([]);
  const [carrito, setCarrito] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Cargar el catálogo con el stock actual
  const cargarCatalogo = async () => {
    setIsLoading(true);
    try {
      const data = await medicamentoService.listar();
      setMedicamentos(data);
    } catch (error) {
      console.error("Error al cargar medicamentos", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  // 2. Lógica de los botones + y -
  const handleAdd = (medId: number, maxStock: number) => {
    const cantidadActual = carrito[medId] || 0;
    if (cantidadActual < maxStock) {
      setCarrito({ ...carrito, [medId]: cantidadActual + 1 });
    }
  };

  const handleSub = (medId: number) => {
    const cantidadActual = carrito[medId] || 0;
    if (cantidadActual > 1) {
      setCarrito({ ...carrito, [medId]: cantidadActual - 1 });
    } else if (cantidadActual === 1) {
      const nuevoCarrito = { ...carrito };
      delete nuevoCarrito[medId];
      setCarrito(nuevoCarrito);
    }
  };

  // 3. Confirmar el despacho (Venta FEFO)
  const confirmarDespacho = async () => {
    const items = Object.entries(carrito).map(([id, cantidad]) => ({
      medicamento_id: Number(id),
      cantidad: cantidad
    }));

    if (items.length === 0) return alert("Agrega al menos un medicamento");

    setIsSubmitting(true);
    try {
      // Llamamos a tu backend que ya tiene la lógica FEFO
      await logisticsService.registrarSalida(items);
      alert("✅ ¡Despacho exitoso! El sistema ha descontado el stock por FEFO y generado alertas si es necesario.");
      setCarrito({}); // Limpiamos el carrito
      cargarCatalogo(); // Recargamos el stock
    } catch (error: any) {
      alert(error.response?.data?.detail || "Error al procesar la salida");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems = Object.values(carrito).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]">
      
      {/* PANEL IZQUIERDO: CATÁLOGO DE MEDICAMENTOS */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden h-[55%] lg:h-full">
        <div className="p-4 md:p-5 border-b border-outline-variant/30 bg-surface-container-low/50">
          <h2 className="font-headline font-bold text-lg md:text-xl flex items-center gap-2">
            <PackageSearch className="text-primary w-5 h-5 md:w-6 md:h-6" /> Seleccionar Productos
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1">Usa los botones + y - para agregar a la orden de salida.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {isLoading ? (
            <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {medicamentos.map((med) => {
                const cantidadEnCarrito = carrito[med.id] || 0;
                const sinStock = med.stock_actual === 0;

                return (
                  <div key={med.id} className={`p-4 rounded-xl border transition-all ${cantidadEnCarrito > 0 ? 'border-primary bg-primary/5' : 'border-outline-variant/40 bg-white hover:border-outline/50'} ${sinStock ? 'opacity-50 grayscale' : ''}`}>
                    <h3 className="font-bold text-on-surface line-clamp-1 text-sm md:text-base" title={med.nombre}>{med.nombre}</h3>
                    <p className="text-xs text-outline mb-3">{med.presentacion}</p>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-[10px] md:text-[11px] font-bold text-outline uppercase">Stock Disponible</p>
                        <p className={`font-bold text-base md:text-lg ${sinStock ? 'text-error' : 'text-on-surface'}`}>
                          {med.stock_actual} uds
                        </p>
                      </div>

                      {/* CONTROLES DE CANTIDAD (+ y -) */}
                      {!sinStock && (
                        <div className="flex items-center gap-2 md:gap-3 bg-surface-container-low rounded-lg p-1 border border-outline-variant/30">
                          <button 
                            type="button"
                            onClick={() => handleSub(med.id)}
                            className="w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-on-surface-variant transition-all disabled:opacity-30"
                            disabled={cantidadEnCarrito === 0}
                          >
                            <Minus className="w-4 h-4 md:w-4 md:h-4" />
                          </button>
                          
                          <span className="font-bold text-sm w-4 text-center">{cantidadEnCarrito}</span>
                          
                          <button 
                            type="button"
                            onClick={() => handleAdd(med.id, med.stock_actual)}
                            className="w-9 h-9 md:w-8 md:h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-on-surface transition-all disabled:opacity-30"
                            disabled={cantidadEnCarrito >= med.stock_actual}
                          >
                            <Plus className="w-4 h-4 md:w-4 md:h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* PANEL DERECHO: RESUMEN DE SALIDA (CARRITO) */}
      <div className="w-full lg:w-96 flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden h-[45%] lg:h-full flex-shrink-0">
        <div className="p-4 md:p-5 border-b border-outline-variant/30 bg-primary text-white shrink-0">
          <h2 className="font-headline font-bold text-base md:text-lg flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Resumen de Salida
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-outline gap-3 text-center">
              <PackageSearch className="w-10 h-10 md:w-12 md:h-12 opacity-20" />
              <p className="text-xs md:text-sm font-medium">No has seleccionado ningún medicamento.</p>
            </div>
          ) : (
            <ul className="space-y-2 md:space-y-3">
              {Object.entries(carrito).map(([idStr, cantidad]) => {
                const med = medicamentos.find(m => m.id === Number(idStr));
                if (!med) return null;
                return (
                  <li key={med.id} className="flex justify-between items-center p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <div className="pr-2">
                      <p className="font-bold text-xs md:text-sm text-on-surface line-clamp-1">{med.nombre}</p>
                      <p className="text-[10px] md:text-xs text-on-surface-variant">FEFO Automático</p>
                    </div>
                    <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap">
                      x{cantidad}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="p-4 md:p-5 border-t border-outline-variant/30 bg-surface-container-low/30 space-y-3 md:space-y-4 shrink-0">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm md:text-base text-on-surface-variant">Total Unidades:</span>
            <span className="font-bold text-lg md:text-xl">{totalItems}</span>
          </div>
          
          <button 
            onClick={confirmarDespacho}
            disabled={totalItems === 0 || isSubmitting}
            className="w-full py-3 md:py-3.5 rounded-xl bg-primary text-white font-bold text-sm md:text-base shadow-sm hover:shadow-md hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />}
            {isSubmitting ? "Procesando..." : "Confirmar Salida"}
          </button>
        </div>
      </div>
      
    </div>
  );
};