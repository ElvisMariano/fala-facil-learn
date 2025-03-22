import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { z } from 'zod'

const tokenSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['STUDENT', 'ADMIN'])
})

export type AuthenticatedRequest = Request & {
  user: z.infer<typeof tokenSchema>
}

export async function authMiddleware(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado')
    }

    const decoded = verify(token, process.env.JWT_SECRET)
    const validatedUser = tokenSchema.parse(decoded)

    // Adiciona o usuário autenticado à requisição
    const requestWithUser = request as AuthenticatedRequest
    requestWithUser.user = validatedUser

    return NextResponse.next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    console.error('Erro na autenticação:', error)
    return NextResponse.json(
      { error: 'Erro na autenticação' },
      { status: 401 }
    )
  }
} 