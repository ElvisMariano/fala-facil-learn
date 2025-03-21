import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

export async function authMiddleware(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      )
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Adiciona o usuário decodificado ao request
    const requestWithUser = request as any
    requestWithUser.user = decoded

    return NextResponse.next()
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )
  }
} 