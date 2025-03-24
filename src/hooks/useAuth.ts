
import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { User } from '@/types/auth';

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
        // Use the user object directly as returned from the server
        setUser(response.data.user);
        console.log('Login successful. User:', response.data.user);
        console.log('Is admin?', response.data.user.role === 'ADMIN');
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
  
  // Use exact equality check for admin role
  const isAdmin = user?.role === 'ADMIN';

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
