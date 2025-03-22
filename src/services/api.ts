
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Função auxiliar para manipular erros de requisição
const handleError = (error: any) => {
  console.error("API Error:", error);
  
  let errorMessage = "Ocorreu um erro na requisição. Tente novamente mais tarde.";
  
  if (error.response) {
    // O servidor respondeu com um status de erro
    const data = error.response.data;
    errorMessage = data.error || data.message || errorMessage;
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
  }
  
  toast.error(errorMessage);
  return Promise.reject(errorMessage);
};

// Função auxiliar para requisições HTTP
const request = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Adiciona o token de autenticação se disponível
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Verifica se a resposta não é ok (status 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData, status: response.status } };
    }

    // Se a resposta for vazia, retorna null
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return handleError(error);
  }
};

export const api = {
  get: (endpoint: string, params = {}) => {
    const url = new URL(`${API_URL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        url.searchParams.append(key, params[key as keyof typeof params].toString());
      }
    });
    
    return request(url.toString().replace(API_URL, ""));
  },
  
  post: (endpoint: string, data = {}) => {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  
  put: (endpoint: string, data = {}) => {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  
  delete: (endpoint: string) => {
    return request(endpoint, {
      method: "DELETE",
    });
  },
};
