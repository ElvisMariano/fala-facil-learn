
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
        
        // Normalize user object to ensure consistent role property
        const user = response.data.data.user;
        
        // Ensure role is always uppercase for consistency in checks
        if (user && user.role) {
          user.role = user.role.toUpperCase();
        }
        
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User saved to localStorage:', user);
        console.log('Is admin?', user.role === 'ADMIN');
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
        
        // Ensure role is always uppercase for consistency
        if (user.role) {
          user.role = user.role.toUpperCase();
        }
        
        console.log('Current user from localStorage:', user);
        console.log('Is admin?', user.role === 'ADMIN');
        
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const user = this.getCurrentUser();
    const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
    console.log('isAdmin check:', isAdmin, 'User role:', user?.role);
    return isAdmin;
  }
};
