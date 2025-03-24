import prisma from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

interface LessonFilters {
  category?: string;
  level?: string;
  status?: string;
}

interface LessonData {
  title: string;
  description?: string;
  level: string;
  category: string;
  content: string;
  status?: string;
}

interface ProgressData {
  status: string;
  score?: number;
}

export class LessonService {
  async getAll(filters: LessonFilters = {}) {
    const where: any = {};

    if (filters.category) where.category = filters.category;
    if (filters.level) where.level = filters.level;
    if (filters.status) where.status = filters.status;

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return lessons;
  }

  async getById(id: number) {
    const lesson = await prisma.lesson.findUnique({
      where: { id }
    });

    if (!lesson) {
      throw new AppError(404, 'Lição não encontrada');
    }

    return lesson;
  }

  async create(data: LessonData) {
    const lesson = await prisma.lesson.create({
      data
    });

    return lesson;
  }

  async update(id: number, data: Partial<LessonData>) {
    const lesson = await prisma.lesson.update({
      where: { id },
      data
    });

    return lesson;
  }

  async delete(id: number) {
    await prisma.lesson.delete({
      where: { id }
    });
  }

  async updateProgress(lessonId: number, userId: number, data: ProgressData) {
    const lesson = await this.getById(lessonId);

    const progress = await prisma.userLessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        status: data.status,
        score: data.score,
        completedAt: data.status === 'completed' ? new Date() : null
      },
      create: {
        userId,
        lessonId,
        status: data.status,
        score: data.score,
        completedAt: data.status === 'completed' ? new Date() : null
      }
    });

    return progress;
  }
} 