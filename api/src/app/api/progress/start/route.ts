import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/shared/middlewares/auth'

const startLessonSchema = z.object({
  lessonId: z.string().uuid()
})

export async function POST(request: NextRequest) {
  try {
    console.log("[START] POST /api/progress/start")
    
    const authResponse = await authMiddleware(request)
    console.log("[AUTH] User authenticated:", authResponse)

    const body = await request.json()
    console.log("[BODY] Request body:", body)
    
    const { lessonId } = startLessonSchema.parse(body)
    console.log("[VALIDATION] LessonId validated:", lessonId)

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    })
    console.log("[DB] Lesson found:", lesson)

    if (!lesson) {
      console.log("[ERROR] Lesson not found")
      return NextResponse.json(
        { error: 'Lição não encontrada' },
        { status: 404 }
      )
    }

    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: authResponse.user.id,
          lessonId
        }
      }
    })
    console.log("[DB] Existing progress:", existingProgress)

    let progress
    
    if (existingProgress) {
      progress = await prisma.progress.update({
        where: {
          userId_lessonId: {
            userId: authResponse.user.id,
            lessonId
          }
        },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
          attempts: {
            increment: 1
          }
        }
      })
      console.log("[DB] Progress updated:", progress)
    } else {
      progress = await prisma.progress.create({
        data: {
          userId: authResponse.user.id,
          lessonId,
          status: 'IN_PROGRESS',
          startedAt: new Date(),
          attempts: 1
        }
      })
      console.log("[DB] Progress created:", progress)
    }

    await prisma.user.update({
      where: { id: authResponse.user.id },
      data: { lastActivityAt: new Date() }
    })
    console.log("[DB] User last activity updated")

    return NextResponse.json(progress)
  } catch (error) {
    console.error("[ERROR] Internal error:", error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 