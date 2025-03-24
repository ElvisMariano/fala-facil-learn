import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';

export interface User {
  id: number;
  username?: string;
  name?: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(AuthService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setUser(user);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login({ email, password });
      
      // Verificar se a resposta está em um formato esperado e atualizar o usuário
      if (response.data && response.data.user) {
        setUser(response.data.user);
      } else if (response.user) {
        setUser(response.user);
      } else {
        console.error('Formato de resposta inesperado no login:', response);
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error ||
                         err.message || 
                         'Erro ao fazer login. Por favor, tente novamente.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.register({ username, email, password });
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Erro ao criar conta. Por favor, tente novamente.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user && (user.role?.toUpperCase() === 'ADMIN');

  // Função para obter o nome de usuário, considerando tanto username quanto name
  const getUserDisplayName = () => {
    return user?.username || user?.name || '';
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    getUserDisplayName
  };
}; 