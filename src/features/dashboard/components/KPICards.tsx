import React from 'react';

export const KPICards: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 shadow-sm">
        <p className="text-on-surface-variant font-label-md">Stock Total</p>
        <h3 className="font-headline-md text-on-surface">12,482</h3>
      </div>
      {/* Repite para las otras 3 tarjetas */}
    </section>
  );
};