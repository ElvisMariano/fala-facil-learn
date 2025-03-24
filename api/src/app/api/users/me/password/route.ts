
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { compare, hash } from 'bcryptjs';
import { authMiddleware, AuthenticatedRequest } from '@/middlewares/auth';
import { handleError, AppError } from '@/utils/errorHandler';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'A senha atual deve ter pelo menos 6 caracteres'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

export async function PUT(request: Request) {
  try {
    // Verifica autenticação
    const authResponse = await authMiddleware(request);
    if (authResponse.status === 401) {
      return authResponse;
    }

    const authenticatedRequest = request as AuthenticatedRequest;
    const userId = authenticatedRequest.user.id;
    
    const body = await request.json();
    
    try {
      const { currentPassword, newPassword } = changePasswordSchema.parse(body);
      
      // Busca o usuário para verificar a senha atual
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { passwordHash: true }
      });
      
      if (!user) {
        throw new AppError('Usuário não encontrado', 404);
      }
      
      // Verifica se a senha atual está correta
      const isValidPassword = await compare(currentPassword, user.passwordHash);
      
      if (!isValidPassword) {
        throw new AppError('Senha atual incorreta', 400);
      }
      
      // Atualiza a senha
      const passwordHash = await hash(newPassword, 12);
      
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash }
      });
      
      return NextResponse.json({
        message: 'Senha atualizada com sucesso'
      });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: validationError.errors[0].message },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    return handleError(error);
  }
}
