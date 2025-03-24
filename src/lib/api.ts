import axios from 'axios';
import { toast } from 'sonner';

// Get API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    
    // Handle different error types
    if (error.response) {
      // The server responded with an error status
      if (error.response.status === 401) {
        // Unauthorized - token invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Only redirect to login if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.');
          window.location.href = '/login';
        }
      } else if (error.response.status === 403) {
        // Forbidden - user doesn't have permission
        toast.error('Você não tem permissão para acessar este recurso.');
      } else if (error.response.status === 404) {
        // Not found
        toast.error('O recurso solicitado não foi encontrado.');
      } else if (error.response.status >= 500) {
        // Server error
        toast.error('Erro no servidor. Por favor, tente novamente mais tarde.');
      } else {
        // Other error status codes
        const errorMessage = error.response.data?.message 
          || error.response.data?.error 
          || 'Ocorreu um erro na requisição.';
        toast.error(errorMessage);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
    } else {
      // Something happened in setting up the request
      toast.error('Ocorreu um erro ao processar sua solicitação.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
