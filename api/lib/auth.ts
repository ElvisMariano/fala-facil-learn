import { verify } from 'jsonwebtoken';
import { prisma } from './prisma';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export async function getUserFromToken(request: Request) {
  try {
    // Obter o token de autorização
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return null;
    }

    // Verificar o token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET não configurado');
      return null;
    }

    const decoded = verify(token, secret) as JwtPayload;
    if (!decoded || !decoded.id) {
      return null;
    }

    // Buscar o usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return null;
  }
} 