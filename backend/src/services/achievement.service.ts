import prisma from '../lib/prisma';

export class AchievementService {
  async getAchievements(userId: number) {
    const achievements = await prisma.achievement.findMany({
      where: { userId },
      orderBy: [
        { earned: 'desc' },
        { progress: 'desc' }
      ]
    });

    return achievements;
  }

  async getStats(userId: number) {
    const achievements = await prisma.achievement.findMany({
      where: { userId }
    });

    const totalAchievements = achievements.length;
    const earnedAchievements = achievements.filter(a => a.earned).length;
    const totalXP = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.xp, 0);

    // Find next achievement (highest progress among non-earned achievements)
    const nextAchievement = achievements
      .filter(a => !a.earned && a.progress > 0)
      .sort((a, b) => b.progress - a.progress)[0];

    return {
      totalAchievements,
      earnedAchievements,
      totalXP,
      nextAchievement
    };
  }

  // Helper method to check and update achievements based on user actions
  async checkAndUpdateAchievements(userId: number, action: string, value: any) {
    const achievements = await prisma.achievement.findMany({
      where: { userId }
    });

    for (const achievement of achievements) {
      if (achievement.earned) continue;

      let progress = 0;
      switch (action) {
        case 'complete_lesson':
          if (achievement.category === 'iniciante') {
            progress = Math.min(100, (value / achievement.target) * 100);
          }
          break;
        case 'streak_days':
          if (achievement.category === 'sequencia') {
            progress = Math.min(100, (value / achievement.target) * 100);
          }
          break;
        case 'level_up':
          if (achievement.category === 'nivel') {
            progress = Math.min(100, (value / achievement.target) * 100);
          }
          break;
        case 'flashcard_review':
          if (achievement.category === 'flashcards') {
            progress = Math.min(100, (value / achievement.target) * 100);
          }
          break;
        // Add more cases as needed
      }

      if (progress > achievement.progress) {
        await prisma.achievement.update({
          where: { id: achievement.id },
          data: {
            progress,
            earned: progress === 100,
            earnedAt: progress === 100 ? new Date() : null
          }
        });
      }
    }
  }
} 