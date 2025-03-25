import { NextResponse } from 'next/server';
import { verifyToken } from '../src/utils/jwt';
import { AuthToken } from '../src/types/auth';

export type AuthenticatedRequest = Request & {
  user: AuthToken;
};

export type AuthMiddlewareResult = {
  success: boolean;
  error?: string;
  user?: AuthToken;
};

export async function authMiddleware(request: Request): Promise<AuthMiddlewareResult> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Token não fornecido'
      };
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = verifyToken(token);
      
      return {
        success: true,
        user: decoded
      };
    } catch (error) {
      return {
        success: false,
        error: 'Token inválido'
      };
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return {
      success: false,
      error: 'Erro na autenticação'
    };
  }
}

export function requireAdmin(request: AuthenticatedRequest) {
  if (request.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Apenas administradores podem acessar este recurso.' },
      { status: 403 }
    );
  }
  
  return null;
}
