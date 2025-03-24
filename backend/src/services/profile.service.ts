import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

interface ProfileUpdateData {
  learningGoal?: string;
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    streak?: boolean;
    updates?: boolean;
  };
}

export class ProfileService {
  async getProfile(userId: number) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!profile) {
      throw new AppError(404, 'Perfil não encontrado');
    }

    return profile;
  }

  async updateProfile(userId: number, data: ProfileUpdateData) {
    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        learningGoal: data.learningGoal,
        language: data.language,
        notifications: data.notifications as any // Prisma will handle the JSON conversion
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            role: true
          }
        }
      }
    });

    return profile;
  }

  async updatePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new AppError(401, 'Senha atual incorreta');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
  }
} 