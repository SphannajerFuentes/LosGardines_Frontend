import React, { useState } from 'react';

import { IngresoStockPage } from './IngresoStockPage';
import { MedicamentosPage } from './MedicamentoPage';

export const GestionInventarioPage: React.FC = () => {
  const [tab, setTab] = useState<'catalogo' | 'ingreso'>('catalogo');

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab('catalogo')} className={`p-3 rounded-lg ${tab === 'catalogo' ? 'bg-primary text-white' : 'bg-white border'}`}>Catálogo</button>
        <button onClick={() => setTab('ingreso')} className={`p-3 rounded-lg ${tab === 'ingreso' ? 'bg-primary text-white' : 'bg-white border'}`}>Ingreso Lotes</button>
      </div>
      
      {tab === 'catalogo' ? <MedicamentosPage /> : <IngresoStockPage />}
    </div>
  );
};