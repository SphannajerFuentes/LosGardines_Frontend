import React, { useState } from 'react';
import { IngresoStockPage } from './IngresoStockPage';
import { MedicamentosPage } from './MedicamentosPage';
import { PackageSearch, ArrowDownToLine } from 'lucide-react';
import { NotificacionFeedback } from '../../../components/NotificacionFeedback';

export const GestionInventarioPage: React.FC = () => {
  const [tab, setTab] = useState<'catalogo' | 'ingreso'>('catalogo');
  
  // Estados listos para notificaciones generales de inventario
  const [msgError, setMsgError] = useState<string | null>(null);
  const [msgSuccess, setMsgSuccess] = useState<string | null>(null);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* 🔔 Panel Dinámico de Notificaciones */}
      <div className="space-y-4">
        {msgError && <NotificacionFeedback mensaje={msgError} tipo="error" onClose={() => setMsgError(null)} />}
        {msgSuccess && <NotificacionFeedback mensaje={msgSuccess} tipo="success" onClose={() => setMsgSuccess(null)} />}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Gestión de Inventario</h1>
          <p className="text-sm text-on-surface-variant mt-1">Administra tu catálogo de productos y registra nuevos lotes.</p>
        </div>

        {/* Control Segmentado Moderno */}
        <div className="bg-surface-container-low p-1 rounded-xl flex w-full md:w-auto border border-outline-variant/30">
          <button 
            onClick={() => setTab('catalogo')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === 'catalogo' 
                ? 'bg-white text-primary shadow-sm ring-1 ring-outline-variant/10' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
            }`}
          >
            <PackageSearch className="w-4 h-4" />
            Catálogo
          </button>
          <button 
            onClick={() => setTab('ingreso')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === 'ingreso' 
                ? 'bg-white text-primary shadow-sm ring-1 ring-outline-variant/10' 
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
            }`}
          >
            <ArrowDownToLine className="w-4 h-4" />
            Ingreso de Lotes
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        {tab === 'catalogo' ? <MedicamentosPage /> : <IngresoStockPage />}
      </div>
    </div>
  );
};