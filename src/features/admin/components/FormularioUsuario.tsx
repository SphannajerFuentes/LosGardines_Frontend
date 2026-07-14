// src/features/admin/components/FormularioUsuario.tsx
import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import type { UsuarioInput } from '../services/adminService';


interface FormularioUsuarioProps {
  onSubmitting: (datos: UsuarioInput, reset: () => void) => void;
  isLoading: boolean;
}

export const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({ onSubmitting, isLoading }) => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState(3); // Por defecto Farmacéutico

  const resetForm = () => {
    setNombre('');
    setContrasena('');
    setRol(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !contrasena.trim()) return;
    onSubmitting({ nombre: nombre.trim(), contrasena, rol }, resetForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant mb-1.5">
          Nombre de Usuario
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. maria.gomez"
          required
          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-[14px] text-on-surface focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant mb-1.5">
          Contraseña Inicial
        </label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-[14px] text-on-surface focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant mb-1.5">
          Rol asignado dentro del sistema
        </label>
        <select
          value={rol}
          onChange={(e) => setRol(Number(e.target.value))}
          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-[14px] text-on-surface focus:outline-none focus:border-primary transition-colors"
        >
          <option value={1}>Administrador (Control Total)</option>
          <option value={2}>Almacenero (Ingresos e Inventario)</option>
          <option value={3}>Farmacéutico (Ventas y Despacho)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-on-primary hover:bg-primary/90 font-medium rounded-xl py-3 text-[14px] flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            Crear Colaborador
          </>
        )}
      </button>
    </form>
  );
};