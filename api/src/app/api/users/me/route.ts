
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware, AuthenticatedRequest } from '../../../../middlewares/auth';
import { handleError, AppError } from '../../../../utils/errorHandler';

export async function GET(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;

    // Busca os dados do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            avatarUrl: true,
            bio: true,
            learningGoal: true,
            language: true,
            notificationsEnabled: true
          }
        },
        _count: {
          select: {
            progress: true,
            userAchievements: true
          }
        }
      }
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    // Busca estatísticas de progresso
    const progressStats = await prisma.progress.groupBy({
      by: ['status'],
      where: { userId },
      _count: true
    });

    const stats = {
      lessonsCompleted: progressStats.find(p => p.status === 'COMPLETED')?._count || 0,
      lessonsInProgress: progressStats.find(p => p.status === 'IN_PROGRESS')?._count || 0,
      achievementsCount: user._count.userAchievements,
      totalLessons: user._count.progress
    };

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      stats
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    
    const body = await request.json();
    const { name, email } = body;

    // Atualiza os dados do usuário
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      user: updatedUser,
      message: 'Perfil atualizado com sucesso'
    });
  } catch (error) {
    return handleError(error);
  }
}
