import { NextResponse } from 'next/server';
import { getUserFromToken } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

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

// Endpoint para obter as estatísticas de progresso do usuário
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

    // Buscar dados do usuário real
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        level: true,
        xp: true,
        streak: true,
      }
    });

    if (!user) {
      const response = NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
      
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      
      return response;
    }

    // Dados de exemplo para mock (em um ambiente real, estes viriam do banco de dados)
    const progressData = {
      level: user.level || 1,
      proficiencyLevel: getProficiencyLevel(user.level || 1),
      totalMinutes: 180,
      totalWords: 132,
      totalXP: user.xp || 1320,
      
      weeklyData: [
        { day: "Seg", minutes: 15, words: 12, xp: 120 },
        { day: "Ter", minutes: 20, words: 18, xp: 180 },
        { day: "Qua", minutes: 25, words: 15, xp: 150 },
        { day: "Qui", minutes: 15, words: 10, xp: 100 },
        { day: "Sex", minutes: 30, words: 22, xp: 220 },
        { day: "Sáb", minutes: 40, words: 30, xp: 300 },
        { day: "Dom", minutes: 35, words: 25, xp: 250 },
      ],
      
      monthlyData: [
        { month: "Jan", xp: 1200 },
        { month: "Fev", xp: 1800 },
        { month: "Mar", xp: 2200 },
        { month: "Abr", xp: 2500 },
        { month: "Mai", xp: 3000 },
        { month: "Jun", xp: 2800 },
      ],
      
      skillsData: [
        { name: "Vocabulário", mastery: 68 },
        { name: "Gramática", mastery: 45 },
        { name: "Compreensão", mastery: 72 },
        { name: "Fala", mastery: 38 },
        { name: "Leitura", mastery: 65 },
        { name: "Escrita", mastery: 52 },
      ],
      
      completedLessons: [
        { id: 1, title: "Conjugação de Verbos no Presente", date: "2023-05-10", score: 8.5 },
        { id: 2, title: "Vocabulário de Família", date: "2023-05-12", score: 9.0 },
        { id: 3, title: "Tempos Verbais: Passado Simples", date: "2023-05-15", score: 7.5 },
        { id: 4, title: "Pronomes Pessoais", date: "2023-05-18", score: 10.0 },
        { id: 5, title: "Vocabulário de Comidas", date: "2023-05-20", score: 8.0 },
      ]
    };

    const response = NextResponse.json(progressData);
    
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return response;
  } catch (error) {
    console.error('Erro ao obter dados de progresso:', error);
    
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

// Função para determinar o nível de proficiência com base no nível do usuário
function getProficiencyLevel(level: number): string {
  if (level < 5) return 'A1';
  if (level < 10) return 'A2';
  if (level < 15) return 'B1';
  if (level < 20) return 'B2';
  if (level < 25) return 'C1';
  return 'C2';
} 