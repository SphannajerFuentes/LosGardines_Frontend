import { api } from '../../../config/api';

export const authService = {
  signIn: async (nombre: string) => {
    const response = await api.post('/auth/login', {
      nombre, 
    });

    return response.data;
  }
};