// src/features/admin/components/FormularioProveedor.tsx
import React, { useState } from 'react';
import {  Loader2 } from 'lucide-react';
import { type ProveedorInput } from '../services/adminService';

interface Props {
  onSubmitting: (d: ProveedorInput, r: () => void) => void;
  isLoading: boolean;
}

export const FormularioProveedor: React.FC<Props> = ({ onSubmitting, isLoading }) => {
  const [form, setForm] = useState({ nombre: '', contacto: '', telefono: '' });

  const reset = () => setForm({ nombre: '', contacto: '', telefono: '' });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmitting(form, reset); }} className="space-y-4">
      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant">Nombre Comercial</label>
        <input className="w-full bg-surface-container-low border rounded-xl p-3 mt-1" 
          value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant">Persona de Contacto</label>
        <input className="w-full bg-surface-container-low border rounded-xl p-3 mt-1" 
          value={form.contacto} onChange={e => setForm({...form, contacto: e.target.value})} required />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-on-surface-variant">Teléfono</label>
        <input className="w-full bg-surface-container-low border rounded-xl p-3 mt-1" 
          value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} required />
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold">
        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Registrar Proveedor"}
      </button>
    </form>
  );
};