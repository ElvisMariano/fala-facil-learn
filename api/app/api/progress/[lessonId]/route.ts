import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authMiddleware, AuthenticatedRequest } from '@/shared/middlewares/auth'

const updateProgressSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  completedAt: z.string().datetime().optional(),
  nextReview: z.string().datetime().optional(),
  notes: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  timeSpent: z.number().min(0).optional(),
  attempts: z.number().min(0).optional(),
  score: z.number().min(0).max(100).optional(),
  feedback: z.string().optional(),
  lastPracticed: z.string().datetime().optional(),
  masteryLevel: z.number().min(0).max(100).optional(),
  reviewCount: z.number().min(0).optional(),
  lastReviewDate: z.string().datetime().optional(),
  nextReviewDate: z.string().datetime().optional(),
  reviewInterval: z.number().min(0).optional(),
  reviewHistory: z.array(z.object({
    date: z.string().datetime(),
    score: z.number().min(0).max(100),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    notes: z.string().optional()
  })).optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    console.log("[START] GET /api/progress/[lessonId]")
    
    // Verifica autenticação
    const authResponse = await authMiddleware(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Obtém o usuário autenticado
    const authenticatedRequest = request as AuthenticatedRequest
    const userId = authenticatedRequest.user.id
    const lessonId = params.lessonId

    console.log("[PARAMS] User ID:", userId, "Lesson ID:", lessonId)

    // Busca o progresso
    const progress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
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
    })

    if (!progress) {
      console.log("[NOT_FOUND] Progress not found")
      return NextResponse.json(
        { error: 'Progresso não encontrado' },
        { status: 404 }
      )
    }

    console.log("[SUCCESS] Progress found:", progress)
    return NextResponse.json({ progress })
  } catch (error) {
    console.error("[ERROR] Internal error:", error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    console.log("[START] PUT /api/progress/[lessonId]")
    
    // Verifica autenticação
    const authResponse = await authMiddleware(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Obtém o usuário autenticado
    const authenticatedRequest = request as AuthenticatedRequest
    const userId = authenticatedRequest.user.id
    const lessonId = params.lessonId

    console.log("[PARAMS] User ID:", userId, "Lesson ID:", lessonId)

    const body = await request.json()
    console.log("[BODY] Request body:", body)

    const data = updateProgressSchema.parse(body)
    console.log("[VALIDATION] Data validated:", data)

    // Busca o progresso existente
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      }
    })

    if (!existingProgress) {
      console.log("[NOT_FOUND] Progress not found, creating new")
      // Cria novo progresso
      const progress = await prisma.progress.create({
        data: {
          userId,
          lessonId,
          ...data
        },
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
      })

      console.log("[SUCCESS] Progress created:", progress)
      return NextResponse.json({
        progress,
        message: 'Progresso criado com sucesso'
      })
    }

    // Atualiza o progresso existente
    const progress = await prisma.progress.update({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      data,
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
    })

    console.log("[SUCCESS] Progress updated:", progress)
    return NextResponse.json({
      progress,
      message: 'Progresso atualizado com sucesso'
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