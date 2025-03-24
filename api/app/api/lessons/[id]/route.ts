
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware, AuthenticatedRequest } from '../../../../middlewares/auth';
import { handleError, AppError } from '../../../../src/utils/errorHandler';
import { z } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const lessonId = params.id;

    // Busca a lição pelo ID
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        _count: {
          select: {
            progress: true
          }
        }
      }
    });

    if (!lesson) {
      throw new AppError('Lição não encontrada', 404);
    }

    return NextResponse.json({
      lesson: {
        ...lesson,
        studentsCount: lesson._count.progress
      }
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        { error: 'Não autorizado. Apenas administradores podem atualizar lições.' },
        { status: 403 }
      );
    }

    const lessonId = params.id;
    const body = await request.json();

    // Verifica se a lição existe
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      throw new AppError('Lição não encontrada', 404);
    }

    // Atualiza a lição
    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: body,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        level: true,
        status: true,
        order: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      lesson: updatedLesson,
      message: 'Lição atualizada com sucesso'
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        { error: 'Não autorizado. Apenas administradores podem excluir lições.' },
        { status: 403 }
      );
    }

    const lessonId = params.id;

    // Verifica se a lição existe
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      throw new AppError('Lição não encontrada', 404);
    }

    // Exclui a lição
    await prisma.lesson.delete({
      where: { id: lessonId }
    });

    return NextResponse.json({
      message: 'Lição excluída com sucesso'
    });
  } catch (error) {
    return handleError(error);
  }
}
