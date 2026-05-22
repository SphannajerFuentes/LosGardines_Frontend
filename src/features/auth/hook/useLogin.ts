import { useState } from 'react';
import { authService } from '../services/authService';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    //const email = formData.get('email') as string;
    //const password = formData.get('password') as string;

    try {
      // Llamada al servicio que habla con Python
      //await authService.signIn(email, password);
      
      window.location.href = '/dashboard'; 
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};