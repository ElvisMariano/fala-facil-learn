import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/shared/middlewares/auth'

export async function GET(request: NextRequest) {
  try {
    console.log("[START] GET /api/progress/stats")
    
    const authResponse = await authMiddleware(request)
    console.log("[AUTH] User authenticated:", authResponse)

    // Busca estatísticas gerais
    const [
      progressStats,
      totalTimeSpent,
      averageErrors,
      totalXPEarned,
      reviewsDue
    ] = await Promise.all([
      // Contagem por status
      prisma.progress.groupBy({
        by: ['status'],
        where: {
          userId: authResponse.user.id,
          lesson: {}
        },
        _count: true
      }),

      // Tempo total de estudo
      prisma.progress.aggregate({
        where: {
          userId: authResponse.user.id,
          status: 'COMPLETED'
        },
        _sum: {
          timeSpent: true
        }
      }),

      // Média de erros por lição
      prisma.progress.aggregate({
        where: {
          userId: authResponse.user.id,
          status: 'COMPLETED'
        },
        _avg: {
          errors: true
        }
      }),

      // Total de XP ganho
      prisma.progress.aggregate({
        where: {
          userId: authResponse.user.id,
          status: 'COMPLETED'
        },
        _sum: {
          xpEarned: true
        }
      }),

      // Revisões pendentes
      prisma.progress.count({
        where: {
          userId: authResponse.user.id,
          status: 'COMPLETED',
          nextReview: {
            lte: new Date()
          }
        }
      })
    ])
    console.log("[DB] Raw stats:", { progressStats, totalTimeSpent, averageErrors, totalXPEarned, reviewsDue })

    // Formata as estatísticas
    const statistics = {
      progress: {
        total: progressStats.reduce((acc, curr) => acc + curr._count, 0),
        notStarted: progressStats.find(s => s.status === 'NOT_STARTED')?._count ?? 0,
        inProgress: progressStats.find(s => s.status === 'IN_PROGRESS')?._count ?? 0,
        completed: progressStats.find(s => s.status === 'COMPLETED')?._count ?? 0
      },
      timeSpent: totalTimeSpent._sum.timeSpent ?? 0,
      averageErrors: Math.round((averageErrors._avg.errors ?? 0) * 100) / 100,
      totalXP: totalXPEarned._sum.xpEarned ?? 0,
      reviewsDue
    }
    console.log("[STATS] Formatted statistics:", statistics)

    // Busca histórico de XP dos últimos 7 dias
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const xpHistory = await prisma.progress.groupBy({
      by: ['completedAt'],
      where: {
        userId: authResponse.user.id,
        status: 'COMPLETED',
        completedAt: {
          gte: sevenDaysAgo
        }
      },
      _sum: {
        xpEarned: true
      }
    })
    console.log("[DB] XP history:", xpHistory)

    // Formata o histórico de XP
    const history = xpHistory.map(day => ({
      date: day.completedAt,
      xp: day._sum.xpEarned ?? 0
    }))
    console.log("[HISTORY] Formatted history:", history)

    return NextResponse.json({
      statistics,
      history
    })
  } catch (error) {
    console.error("[ERROR] Internal error:", error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 