// src/features/auth/hooks/useLogin.ts
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthContext } from '../../../context/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { guardarSesion } = useContext(AuthContext); 
  const navigate = useNavigate();

  const limpiarError = () => setError(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const nombre = formData.get('nombre') as string;
    const contrasena = formData.get('contrasena') as string;

    try {
      const data = await authService.signIn(nombre.trim(), contrasena); 
      
      console.log("🚀 Respuesta exacta del Backend:", data);

      // 1. Extraer el token de forma ultra-flexible
      const token = data.access_token || data.token || data.accessToken;

      if (!token) {
        throw new Error("El backend respondió OK, pero no se encontró la propiedad 'access_token' o 'token'.");
      }

      // 2. Extraer y formatear los datos del usuario y su rol
      // Si tu backend manda "rol": 1, lo convertimos al string que espera tu Front-end
      let rolFormateado: 'Administrador' | 'Almacenero' | 'Farmacéutico' = 'Farmacéutico';
      
      const backendRol = data.user?.rol || data.usuario?.rol || data.rol || data.user?.role;

      if (backendRol === 1 || backendRol === '1' || backendRol === 'Administrador') {
        rolFormateado = 'Administrador';
      } else if (backendRol === 2 || backendRol === '2' || backendRol === 'Almacenero') {
        rolFormateado = 'Almacenero';
      } else if (backendRol === 3 || backendRol === '3' || backendRol === 'Farmacéutico') {
        rolFormateado = 'Farmacéutico';
      }

      const userPayload = {
        id: data.user?.id || data.usuario?.id || data.id || "1",
        email: data.user?.email || data.usuario?.email || data.email || nombre,
        rol: rolFormateado
      };

      // Guardamos la sesión limpia con los datos homogeneizados
      guardarSesion(token, userPayload);
      
      // ¡Despegamos al dashboard!
      navigate('/dashboard'); 

    } catch (err: any) {
      console.error("❌ Error capturado en el flujo de Login:", err);
      
      // Si es un error de Axios (HTTP 4xx o 5xx)
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.message) {
        // Si es un error de código JS de nuestro lado
        setError(err.message);
      } else {
        setError("No se pudo conectar con el servidor de Los Girasoles. Verifica tu red.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, setError, limpiarError };
};