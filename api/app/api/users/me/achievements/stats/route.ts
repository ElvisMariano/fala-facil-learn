import { NextResponse } from 'next/server';
import { getUserFromToken } from '../../../../../../lib/auth';
import { prisma } from '../../../../../../lib/prisma';

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

// Endpoint para obter estatísticas de conquistas do usuário
export async function GET(request: Request) {
  try {
    // Obter o ID do usuário a partir do token
    const userId = await getUserFromToken(request);
    
    if (!userId) {
      const response = NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
      
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      
      return response;
    }

    // Mock de dados de estatísticas - em produção, calcularia a partir dos dados reais do usuário
    const stats = {
      totalAchievements: 10,
      earnedAchievements: 2,
      totalXP: 150,
      nextAchievement: {
        id: 2,
        title: "Explorador de Vocabulário",
        description: "Aprenda 50 palavras novas",
        category: "vocabulario",
        xp: 100,
        progress: 80,
        earned: false,
        progressText: "40/50 palavras"
      }
    };

    const response = NextResponse.json(stats);
    
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return response;
  } catch (error) {
    console.error('Erro ao obter estatísticas de conquistas:', error);
    
    const response = NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
    
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return response;
  }
} 