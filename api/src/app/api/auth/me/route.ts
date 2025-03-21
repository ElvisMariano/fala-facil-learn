import { NextResponse } from 'next/server'
import { authMiddleware } from '@/shared/middlewares/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    // Aplica o middleware de autenticação
    const response = await authMiddleware(request as any)
    if (response.status === 401) {
      return response
    }

    const requestWithUser = request as any
    const userId = requestWithUser.user.id

    // Busca o usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        level: true,
        xp: true,
        streak: true,
        role: true,
        lastActivity: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 