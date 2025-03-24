
import { NextResponse } from 'next/server';
import { verifyToken } from '../src/utils/jwt';
import { AuthToken } from '../src/types/auth';

export type AuthenticatedRequest = Request & {
  user: AuthToken;
};

export async function authMiddleware(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = verifyToken(token);
      
      // Adiciona o usuário autenticado à requisição
      const requestWithUser = request as AuthenticatedRequest;
      requestWithUser.user = decoded;

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { error: 'Erro na autenticação' },
      { status: 401 }
    );
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
