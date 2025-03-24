
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware, AuthenticatedRequest } from '../../../middlewares/auth';
import { handleError } from '../../../src/utils/errorHandler';

export async function GET(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;

    // Busca as conquistas do usuário
    const achievements = await prisma.achievement.findMany({
      where: {
        userAchievements: {
          some: {
            userId
          }
        }
      },
      include: {
        userAchievements: {
          where: {
            userId
          },
          select: {
            completedAt: true
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    // Transformar os dados para o formato esperado pelo frontend
    const formattedAchievements = achievements.map(achievement => ({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      category: achievement.category,
      points: achievement.points,
      completedAt: achievement.userAchievements[0]?.completedAt || null,
      isCompleted: achievement.userAchievements.length > 0
    }));

    return NextResponse.json({
      achievements: formattedAchievements
    });
  } catch (error) {
    return handleError(error);
  }
}
