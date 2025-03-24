import { NextResponse } from 'next/server';
import { getUserFromToken } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

// Função para lidar com requisições OPTIONS (preflight)
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

// GET /api/users/me/profile - Obter o perfil do usuário logado
export async function GET(request: Request) {
  try {
    // Verificar autenticação
    const user = await getUserFromToken(request);
    if (!user) {
      const response = NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Buscar usuário completo com informações de perfil
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        level: true,
        xp: true,
        streak: true,
        timezone: true,
        lastActivityAt: true,
      },
    });

    // Transformar para o formato esperado pelo frontend
    const profile = {
      id: userProfile?.id,
      userId: userProfile?.id,
      name: userProfile?.name,
      email: userProfile?.email,
      level: userProfile?.level || 1,
      xp: userProfile?.xp || 0,
      streakDays: userProfile?.streak || 0,
      lastActivity: userProfile?.lastActivityAt,
      learningGoal: 'casual', // Valor padrão já que não existe no schema
      language: 'en', // Valor padrão já que não existe no schema
      notifications: {
        email: true,
        push: true,
        streak: true,
        updates: true,
      },
    };

    const response = NextResponse.json(profile);
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    const response = NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  }
}

// PATCH /api/users/me/profile - Atualizar o perfil do usuário logado
export async function PATCH(request: Request) {
  try {
    // Verificar autenticação
    const user = await getUserFromToken(request);
    if (!user) {
      const response = NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
      // Adicionar cabeçalhos CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      return response;
    }

    // Receber dados de atualização
    const body = await request.json();
    const { timezone, notifications } = body;

    // Atualizar usuário (apenas campos que estão realmente no schema)
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(timezone && { timezone }),
        lastActivityAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        level: true,
        xp: true,
        streak: true,
        timezone: true,
        lastActivityAt: true,
      },
    });

    // Transformar para o formato esperado pelo frontend
    const profile = {
      id: updatedUser.id,
      userId: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      level: updatedUser.level || 1,
      xp: updatedUser.xp || 0,
      streakDays: updatedUser.streak || 0,
      lastActivity: updatedUser.lastActivityAt,
      learningGoal: body.learningGoal || 'casual', // Retornamos o que o cliente enviou
      language: body.language || 'en', // Retornamos o que o cliente enviou
      notifications: notifications || {
        email: true,
        push: true,
        streak: true,
        updates: true,
      },
    };

    const response = NextResponse.json(profile);
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    const response = NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  }
} 