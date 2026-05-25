import { api } from '../../../config/api';

export const authService = {
  signIn: async (nombre: string, contrasena: string) => {
    // Apuntamos al endpoint correcto del backend
    const response = await api.post('/api/v1/auth/login', {
      nombre, 
      contrasena
    });

    return response.data;
  }
};