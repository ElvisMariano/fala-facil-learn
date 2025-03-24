
import api from '../lib/api';
import { AuthResponse, LoginData, RegisterData, User } from '@/types/auth';

export const AuthService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const apiData = {
      name: data.username,
      email: data.email,
      password: data.password,
      role: 'STUDENT',
    };
    
    console.log('Dados enviados para registro:', apiData);
    const response = await api.post<AuthResponse>('/auth/register', apiData);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      console.log('Dados enviados para login:', data);
      const response = await api.post<AuthResponse>('/auth/login', data);
      
      console.log('Resposta do login:', response.data);
      
      // Verifica se a resposta tem o formato esperado
      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      } else {
        console.error('Formato de resposta inesperado:', response.data);
        throw new Error('Formato de resposta inválido');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Erro no login:', error.response || error.message || error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr) as User;
        
        // Normalize user object - se existe name mas não username, mapeia name para username
        if (user.name && !user.username) {
          user.username = user.name;
        }
        
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role?.toUpperCase() === 'ADMIN';
  }
};
