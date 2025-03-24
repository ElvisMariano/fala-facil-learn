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

// Endpoint para obter as conquistas do usuário
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

    // Mock de dados - em um ambiente real, você buscaria do banco de dados
    // Aqui estamos usando dados estáticos como exemplo
    const achievements = [
      {
        id: 1,
        title: "Primeira Lição",
        description: "Complete sua primeira lição",
        category: "iniciante",
        xp: 50,
        progress: 100,
        earned: true,
        earnedAt: new Date("2023-04-10")
      },
      {
        id: 2,
        title: "Explorador de Vocabulário",
        description: "Aprenda 50 palavras novas",
        category: "vocabulario",
        xp: 100,
        progress: 80,
        earned: false,
        progressText: "40/50 palavras"
      },
      {
        id: 3,
        title: "Sequência de 3 Dias",
        description: "Estude por 3 dias consecutivos",
        category: "sequencia",
        xp: 100,
        progress: 100,
        earned: true,
        earnedAt: new Date("2023-04-12")
      },
      {
        id: 4,
        title: "Nível 5",
        description: "Alcance o nível 5",
        category: "nivel",
        xp: 150,
        progress: 60,
        earned: false,
        progressText: "Nível 3 de 5"
      },
      {
        id: 5,
        title: "Mestre dos Flashcards",
        description: "Complete 10 conjuntos de flashcards",
        category: "flashcards",
        xp: 200,
        progress: 40,
        earned: false,
        progressText: "4/10 conjuntos"
      },
      {
        id: 6,
        title: "Gramática Perfeita",
        description: "Acerte todas as questões em uma lição de gramática",
        category: "gramatica",
        xp: 250,
        progress: 0,
        earned: false
      },
      {
        id: 7,
        title: "Desafio Diário",
        description: "Complete 5 desafios diários",
        category: "desafio",
        xp: 150,
        progress: 20,
        earned: false,
        progressText: "1/5 desafios"
      },
      {
        id: 8,
        title: "Contribuinte da Comunidade",
        description: "Faça 3 posts no fórum da comunidade",
        category: "social",
        xp: 100,
        progress: 0,
        earned: false
      },
      {
        id: 9,
        title: "Sequência de 7 Dias",
        description: "Estude por 7 dias consecutivos",
        category: "sequencia",
        xp: 150,
        progress: 43,
        earned: false,
        progressText: "3/7 dias"
      },
      {
        id: 10,
        title: "Glossário Básico",
        description: "Aprenda 100 palavras",
        category: "vocabulario",
        xp: 200,
        progress: 0,
        earned: false
      }
    ];

    const response = NextResponse.json(achievements);
    
    // Adicionar cabeçalhos CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return response;
  } catch (error) {
    console.error('Erro ao obter conquistas:', error);
    
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