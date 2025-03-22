import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/shared/middlewares/auth'
import {
  calculateTotalXP,
  calculateLevel,
  calculateNextReview,
  calculateTimeSpent,
  shouldKeepStreak
} from '@/shared/utils/progress'

const completeLessonSchema = z.object({
  lessonId: z.string().uuid(),
  errors: z.number().int().min(0).default(0)
})

export async function POST(request: NextRequest) {
  try {
    console.log("[START] POST /api/progress/complete")
    
    const authResponse = await authMiddleware(request)
    console.log("[AUTH] User authenticated:", authResponse)

    const body = await request.json()
    console.log("[BODY] Request body:", body)
    
    const { lessonId, errors } = completeLessonSchema.parse(body)
    console.log("[VALIDATION] Request validated:", { lessonId, errors })

    // Busca o progresso atual
    const currentProgress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: authResponse.user.id,
          lessonId
        }
      }
    })
    console.log("[DB] Current progress:", currentProgress)

    if (!currentProgress || currentProgress.status !== 'IN_PROGRESS') {
      console.log("[ERROR] Lesson not started")
      return NextResponse.json(
        { error: 'Lição não iniciada' },
        { status: 400 }
      )
    }

    // Busca a lição e o usuário
    const [lesson, user] = await Promise.all([
      prisma.lesson.findUnique({
        where: { id: lessonId }
      }),
      prisma.user.findUnique({
        where: { id: authResponse.user.id }
      })
    ])
    console.log("[DB] Lesson and user:", { lesson, user })

    if (!lesson || !user) {
      console.log("[ERROR] Lesson or user not found")
      return NextResponse.json(
        { error: 'Lição ou usuário não encontrado' },
        { status: 404 }
      )
    }

    // Calcula tempo gasto
    const timeSpent = calculateTimeSpent(
      currentProgress.startedAt!,
      new Date()
    )
    console.log("[CALC] Time spent:", timeSpent)

    // Calcula XP ganho
    const xpEarned = calculateTotalXP(
      parseInt(lesson.level.charAt(1)), // A1 -> 1, B2 -> 2, etc.
      user.streak,
      errors,
      timeSpent
    )
    console.log("[CALC] XP earned:", xpEarned)

    // Calcula novo XP total e nível
    const newXP = user.xp + xpEarned
    const newLevel = calculateLevel(newXP)
    console.log("[CALC] New XP and level:", { newXP, newLevel })

    // Verifica streak
    const keepStreak = shouldKeepStreak(user.lastActivityAt, user.timezone)
    const newStreak = keepStreak ? user.streak + 1 : 1
    console.log("[CALC] New streak:", { keepStreak, newStreak })

    // Calcula próxima revisão
    const nextReview = calculateNextReview(
      currentProgress.reviewCount,
      user.timezone
    )
    console.log("[CALC] Next review:", nextReview)

    // Atualiza progresso e usuário em uma transação
    const [progress, updatedUser] = await prisma.$transaction([
      prisma.progress.update({
        where: {
          userId_lessonId: {
            userId: authResponse.user.id,
            lessonId
          }
        },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          timeSpent,
          errors,
          xpEarned,
          nextReview,
          reviewCount: {
            increment: 1
          }
        }
      }),
      prisma.user.update({
        where: { id: authResponse.user.id },
        data: {
          xp: newXP,
          level: newLevel,
          streak: newStreak,
          lastActivityAt: new Date()
        }
      })
    ])
    console.log("[DB] Progress and user updated:", { progress, updatedUser })

    return NextResponse.json({
      progress,
      user: {
        xp: updatedUser.xp,
        level: updatedUser.level,
        streak: updatedUser.streak,
        xpEarned,
        levelUp: updatedUser.level > user.level
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