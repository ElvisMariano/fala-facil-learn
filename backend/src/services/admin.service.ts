import prisma from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

interface UserUpdateData {
  username?: string;
  email?: string;
  role?: string;
}

export class AdminService {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      include: {
        profile: true
      }
    });

    return users;
  }

  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        lessonProgress: {
          include: {
            lesson: true
          }
        },
        flashcardProgress: {
          include: {
            flashcardDeck: true
          }
        },
        userAchievements: {
          include: {
            achievement: true
          }
        }
      }
    });

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado');
    }

    return user;
  }

  async updateUser(id: number, data: UserUpdateData) {
    const user = await prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true
      }
    });

    return user;
  }

  async deleteUser(id: number) {
    await prisma.user.delete({
      where: { id }
    });
  }

  async getStats() {
    const [
      totalUsers,
      totalLessons,
      totalFlashcardDecks,
      totalAchievements,
      completedLessons,
      completedFlashcards
    ] = await Promise.all([
      prisma.user.count(),
      prisma.lesson.count(),
      prisma.flashcardDeck.count(),
      prisma.achievement.count(),
      prisma.userLessonProgress.count({
        where: { status: 'completed' }
      }),
      prisma.userFlashcardProgress.count({
        where: { status: 'completed' }
      })
    ]);

    return {
      users: {
        total: totalUsers
      },
      lessons: {
        total: totalLessons,
        completed: completedLessons
      },
      flashcards: {
        total: totalFlashcardDecks,
        completed: completedFlashcards
      },
      achievements: {
        total: totalAchievements
      }
    };
  }
} 