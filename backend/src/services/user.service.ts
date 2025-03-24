import prisma from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

interface ProfileUpdateData {
  fullName?: string;
  avatarUrl?: string;
  preferences?: any;
}

export class UserService {
  async getProfile(userId: number) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
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
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        }
      }
    });

    return profile;
  }

  async getProgress(userId: number) {
    const lessonProgress = await prisma.userLessonProgress.findMany({
      where: { userId },
      include: {
        lesson: true
      }
    });

    const flashcardProgress = await prisma.userFlashcardProgress.findMany({
      where: { userId },
      include: {
        flashcardDeck: {
          include: {
            flashcards: true
          }
        }
      }
    });

    return {
      lessons: lessonProgress,
      flashcards: flashcardProgress
    };
  }

  async getAchievements(userId: number) {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true
      }
    });

    return achievements;
  }
} 