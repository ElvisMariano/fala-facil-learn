
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authMiddleware, AuthenticatedRequest } from '../../../middlewares/auth';
import { handleError, AppError } from '../../../utils/errorHandler';

const createLessonSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  category: z.string(),
  level: z.string(),
  content: z.any(),
  order: z.number().optional()
});

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Constrói o where baseado nos filtros
    const where = {
      ...(category && { category }),
      ...(level && { level }),
    };

    // Busca as lições com paginação
    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        orderBy: { order: 'asc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          level: true,
          status: true,
          order: true,
          createdAt: true,
          _count: {
            select: {
              progress: true
            }
          }
        }
      }),
      prisma.lesson.count({ where })
    ]);

    return NextResponse.json({
      lessons: lessons.map(lesson => ({
        ...lesson,
        studentsCount: lesson._count.progress
      })),
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

export async function POST(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    // Verifica se é admin
    const authenticatedRequest = request as AuthenticatedRequest;
    if (authenticatedRequest.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado. Apenas administradores podem criar lições.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    try {
      const data = createLessonSchema.parse(body);
      
      // Cria a lição
      const lesson = await prisma.lesson.create({
        data: {
          ...data,
          status: 'DRAFT'
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          level: true,
          status: true,
          order: true,
          createdAt: true
        }
      });

      return NextResponse.json({
        lesson,
        message: 'Lição criada com sucesso'
      });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: validationError.errors[0].message },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    return handleError(error);
  }
}
