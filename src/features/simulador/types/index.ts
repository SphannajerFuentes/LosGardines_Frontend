export interface KardexRegistro {
  id: number;
  fecha_movimiento: string;
  tipo_movimiento: 'INGRESO' | 'SALIDA';
  cantidad: number;
  numero_lote: string;
  lote_codigo?: string;
  motivo: string;
}

export interface KardexResponse {
  medicamento_id: number;
  nombre: string;
  stock_actual: number;
  historial: KardexRegistro[];
}