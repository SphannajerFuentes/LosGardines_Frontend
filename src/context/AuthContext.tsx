// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

// Definimos la interfaz del usuario basada en la respuesta de tu FastAPI
export interface UsuarioSesion {
  id: string;
  email: string;
  rol: 'Administrador' | 'Almacenero' | 'Farmacéutico';
}

interface AuthContextType {
  usuario: UsuarioSesion | null;
  cargandoSesion: boolean;
  guardarSesion: (accessToken: string, datosUsuario: UsuarioSesion) => void;
  cerrarSesion: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al cargar la app por primera vez, verificamos si hay sesión previa guardada
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_info');
    const token = localStorage.getItem('token');

    if (usuarioGuardado && token) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch {
        localStorage.clear();
      }
    }
    setCargandoSesion(false);
  }, []);

  const guardarSesion = (accessToken: string, datosUsuario: UsuarioSesion) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('usuario_info', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_info');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargandoSesion, guardarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
