import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { updateLessonSchema } from '@/shared/validators/lesson'
import { authMiddleware } from '@/shared/middlewares/auth'

// Buscar uma lição específica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const lesson = await prisma.lesson.findUnique({
      where: { id, deletedAt: null },
      include: {
        _count: {
          select: {
            progress: true
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lição não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      lesson: {
        ...lesson,
        studentsCount: lesson._count.progress
      }
    })
  } catch (error) {
    console.error('Erro ao buscar lição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Atualizar uma lição
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Verifica se é admin
    const requestWithUser = request as any
    if (requestWithUser.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const data = updateLessonSchema.parse(body)

    // Verifica se a lição existe
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: params.id, deletedAt: null }
    })

    if (!existingLesson) {
      return NextResponse.json(
        { error: 'Lição não encontrada' },
        { status: 404 }
      )
    }

    // Atualiza a lição
    const lesson = await prisma.lesson.update({
      where: { id: params.id },
      data
    })

    return NextResponse.json({ lesson })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar lição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Deletar uma lição (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Verifica se é admin
    const requestWithUser = request as any
    if (requestWithUser.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 403 }
      )
    }

    // Verifica se a lição existe
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: params.id, deletedAt: null }
    })

    if (!existingLesson) {
      return NextResponse.json(
        { error: 'Lição não encontrada' },
        { status: 404 }
      )
    }

    // Soft delete da lição
    await prisma.lesson.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    })

    return NextResponse.json(
      { message: 'Lição deletada com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao deletar lição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 