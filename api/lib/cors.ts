import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Função para adicionar cabeçalhos CORS a qualquer resposta
export function setCorsHeaders(response: NextResponse): NextResponse {
  // Em ambiente de produção, você deve limitar as origens permitidas
  // Em desenvolvimento, podemos ser mais permissivos para facilitar o debug
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}

// Função para criar uma resposta de preflight OPTIONS
export function corsPreflightResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

// Middleware para CORS que pode ser usado em qualquer rota
export function corsMiddleware(request: NextRequest, handler: Function) {
  // Verifica se é uma requisição OPTIONS
  if (request.method === 'OPTIONS') {
    return corsPreflightResponse();
  }
  
  // Caso contrário, processa a requisição normalmente e adiciona cabeçalhos CORS
  const response = handler();
  return setCorsHeaders(response);
} 