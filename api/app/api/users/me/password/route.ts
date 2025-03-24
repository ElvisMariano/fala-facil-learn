import { NextResponse } from 'next/server';
import { getUserFromToken } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';

// Esquema de validação para alteração de senha
const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// Função para lidar com requisições OPTIONS (preflight)
export async function OPTIONS(request: Request) {
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

// POST /api/users/me/password - Atualizar senha do usuário
export async function POST(request: Request) {
  try {
    // Verificar autenticação
    const user = await getUserFromToken(request);
    if (!user) {
      const response = NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Receber dados da requisição
    const body = await request.json();
    
    // Validar dados
    const validationResult = passwordUpdateSchema.safeParse(body);
    if (!validationResult.success) {
      const response = NextResponse.json({ 
        error: validationResult.error.errors[0].message 
      }, { status: 400 });
      
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Dados validados
    const { currentPassword, newPassword } = validationResult.data;

    // Buscar usuário com senha
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true }
    });

    if (!userWithPassword) {
      const response = NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Verificar se a senha atual está correta
    const passwordMatch = await compare(currentPassword, userWithPassword.passwordHash);
    if (!passwordMatch) {
      const response = NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 });
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Criar hash da nova senha
    const newPasswordHash = await hash(newPassword, 12);

    // Atualizar senha do usuário
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash }
    });

    const response = NextResponse.json({ message: 'Senha atualizada com sucesso' });
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    const response = NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  }
} 