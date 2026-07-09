import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const HeroSection: React.FC = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <section className="bg-primary-container text-on-primary-container rounded-2xl p-8 flex items-center justify-between shadow-sm border border-primary-container/20 relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
      
      <div className="relative z-10 space-y-2">
        <h1 className="font-headline text-3xl font-bold">
          ¡Hola de nuevo, {usuario?.email || 'Usuario'}! 👋
        </h1>
        <p className="font-body text-[15px] opacity-90 max-w-xl">
          Aquí tienes un resumen de la actividad de Farmacia Los Girasoles. Revisa las alertas de stock para mantener el inventario al día.
        </p>
      </div>
    </section>
  );
};