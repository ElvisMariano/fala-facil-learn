import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authMiddleware, AuthenticatedRequest } from '@/shared/middlewares/auth'

const listProgressSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  includeReview: z.string().transform(Boolean).default('false')
})

export async function GET(request: NextRequest) {
  try {
    console.log("[START] GET /api/progress")
    
    // Verifica autenticação
    const authResponse = await authMiddleware(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Obtém o usuário autenticado
    const authenticatedRequest = request as AuthenticatedRequest
    const userId = authenticatedRequest.user.id

    const searchParams = new URL(request.url).searchParams
    console.log("[PARAMS] Search params:", Object.fromEntries(searchParams))
    
    const {
      status,
      category,
      level,
      page,
      limit,
      includeReview
    } = listProgressSchema.parse(Object.fromEntries(searchParams))
    console.log("[VALIDATION] Params validated:", { status, category, level, page, limit, includeReview })
    
    const skip = (page - 1) * limit

    // Constrói o where baseado nos filtros
    const where = {
      userId,
      ...(status && { status }),
      lesson: {
        ...(category && { category }),
        ...(level && { level })
      },
      ...(includeReview && {
        nextReview: {
          lte: new Date()
        }
      })
    }
    console.log("[DB] Where clause:", where)

    // Busca o progresso com paginação
    const [progress, total] = await Promise.all([
      prisma.progress.findMany({
        where,
        orderBy: [
          { status: 'asc' },
          { updatedAt: 'desc' }
        ],
        skip,
        take: limit,
        include: {
          lesson: {
            select: {
              title: true,
              description: true,
              category: true,
              level: true,
              status: true,
              order: true
            }
          }
        }
      }),
      prisma.progress.count({ where })
    ])
    console.log("[DB] Progress found:", { count: progress.length, total })

    // Busca estatísticas gerais
    const stats = await prisma.progress.groupBy({
      by: ['status'],
      where: {
        userId,
        lesson: {}
      },
      _count: true
    })
    console.log("[DB] Progress stats:", stats)

    // Formata as estatísticas
    const statistics = {
      total: stats.reduce((acc, curr) => acc + curr._count, 0),
      notStarted: stats.find(s => s.status === 'NOT_STARTED')?._count ?? 0,
      inProgress: stats.find(s => s.status === 'IN_PROGRESS')?._count ?? 0,
      completed: stats.find(s => s.status === 'COMPLETED')?._count ?? 0
    }
    console.log("[STATS] Formatted statistics:", statistics)

    return NextResponse.json({
      progress,
      statistics,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit
      }
    })
  } catch (error) {
    console.error("[ERROR] Internal error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 