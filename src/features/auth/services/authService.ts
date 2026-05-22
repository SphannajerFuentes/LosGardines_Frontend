import { api } from '../../../config/api';

export const authService = {
  signIn: async (email: string, password: string) => {
    // Esta ruta debe coincidir con tu endpoint de login en Python
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    // Suponiendo que tu API devuelve { access_token: "..." }
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};