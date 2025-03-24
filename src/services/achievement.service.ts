import api from '../lib/api';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  xp: number;
  progress: number;
  earned: boolean;
  earnedAt?: Date;
  progressText?: string;
}

export interface AchievementStats {
  totalAchievements: number;
  earnedAchievements: number;
  totalXP: number;
  nextAchievement?: Achievement;
}

export const AchievementService = {
  async getAchievements(): Promise<Achievement[]> {
    const response = await api.get<Achievement[]>('/users/me/achievements');
    return response.data;
  },

  async getStats(): Promise<AchievementStats> {
    const response = await api.get<AchievementStats>('/users/me/achievements/stats');
    return response.data;
  }
}; 