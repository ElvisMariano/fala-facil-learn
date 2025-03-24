import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Esta função simples adiciona cabeçalhos CORS a todas as respostas
export function middleware(request: NextRequest) {
  // Para requisições OPTIONS (preflight)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Para todas as outras requisições, apenas continuar sem modificar
  return NextResponse.next()
}

// Aplicar a todos os caminhos da API
export const config = {
  matcher: '/api/:path*',
} 