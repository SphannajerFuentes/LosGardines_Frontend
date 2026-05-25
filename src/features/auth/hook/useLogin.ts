import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthContext } from '../../../context/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { guardarSesion } = useContext(AuthContext); 
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const nombre = formData.get('nombre') as string;
    const contrasena = formData.get('contrasena') as string;

    try {
      // Ahora enviamos ambos parámetros
      const data = await authService.signIn(nombre.trim(), contrasena); 
      
      guardarSesion(data.access_token, data.user);
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.detail || "Usuario o contraseña incorrectos");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};