import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createLessonSchema } from '@/shared/validators/lesson'
import { authMiddleware } from '@/shared/middlewares/auth'

// Listar todas as lições
export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Constrói o where baseado nos filtros
    const where = {
      deletedAt: null,
      ...(category && { category }),
      ...(level && { level }),
    }

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
    ])

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
    })
  } catch (error) {
    console.error('Erro ao listar lições:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Criar uma nova lição
export async function POST(request: Request) {
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
    const data = createLessonSchema.parse(body)

    // Cria a lição
    const lesson = await prisma.lesson.create({
      data: {
        ...data,
        status: 'draft'
      }
    })

    return NextResponse.json({ lesson })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao criar lição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 