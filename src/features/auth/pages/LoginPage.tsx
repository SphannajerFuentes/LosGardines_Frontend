import React from 'react';
import { FormularioLogin } from '../components/FormularioLogin';
import { useLogin } from '../hook/useLogin';
import { HeartPulse } from 'lucide-react';
import '../../../index.css'; // Importación necesaria según tu estructura

export const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useLogin();

  return (
    <div className="flex h-screen w-full overflow-hidden font-body">
      {/* Sidebar Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-mesh relative items-center justify-center p-12">
        
      </div>

      {/* Login Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <HeartPulse className="text-primary w-8 h-8" />
            <span className="text-[20px] font-bold text-on-surface">Los Girasoles</span>
          </div>
          
          <div className="bg-white border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
            {error && <p className="text-error text-sm mb-4">{error}</p>}
            <FormularioLogin onSubmit={login} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};