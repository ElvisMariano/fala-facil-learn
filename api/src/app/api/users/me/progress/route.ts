
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware, AuthenticatedRequest } from '@/middlewares/auth';
import { handleError } from '@/utils/errorHandler';

export async function GET(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    
    const searchParams = new URL(request.url).searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Constrói o where baseado nos filtros
    const where = {
      userId,
      ...(status && { status: status }),
      ...(category && {
        lesson: {
          category
        }
      })
    };
    
    // Busca o progresso com paginação
    const [progress, total] = await Promise.all([
      prisma.progress.findMany({
        where,
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              description: true,
              category: true,
              level: true,
              order: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { updatedAt: 'desc' }
        ]
      }),
      prisma.progress.count({ where })
    ]);
    
    // Busca estatísticas
    const stats = await prisma.progress.groupBy({
      by: ['status'],
      where: { userId },
      _count: true
    });
    
    const statistics = {
      total: stats.reduce((acc, curr) => acc + curr._count, 0),
      completed: stats.find(s => s.status === 'COMPLETED')?._count || 0,
      inProgress: stats.find(s => s.status === 'IN_PROGRESS')?._count || 0,
      notStarted: stats.find(s => s.status === 'NOT_STARTED')?._count || 0
    };
    
    return NextResponse.json({
      progress,
      statistics,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    return handleError(error);
  }
}
