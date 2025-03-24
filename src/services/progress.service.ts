import api from '../lib/api';

export interface WeeklyActivity {
  day: string;
  minutes: number;
  words: number;
  xp: number;
}

export interface MonthlyProgress {
  month: string;
  xp: number;
}

export interface SkillMastery {
  name: string;
  mastery: number;
}

export interface CompletedLesson {
  id: number;
  title: string;
  date: string;
  score: number;
}

export interface ProgressStats {
  level: number;
  proficiencyLevel: string;
  totalMinutes: number;
  totalWords: number;
  totalXP: number;
  weeklyData: WeeklyActivity[];
  monthlyData: MonthlyProgress[];
  skillsData: SkillMastery[];
  completedLessons: CompletedLesson[];
}

export const ProgressService = {
  async getProgressStats(): Promise<ProgressStats> {
    const response = await api.get<ProgressStats>('/users/me/progress');
    return response.data;
  },

  async getWeeklyActivity(): Promise<WeeklyActivity[]> {
    const response = await api.get<WeeklyActivity[]>('/users/me/progress/weekly');
    return response.data;
  },

  async getMonthlyProgress(): Promise<MonthlyProgress[]> {
    const response = await api.get<MonthlyProgress[]>('/users/me/progress/monthly');
    return response.data;
  },

  async getSkillMastery(): Promise<SkillMastery[]> {
    const response = await api.get<SkillMastery[]>('/users/me/progress/skills');
    return response.data;
  },

  async getCompletedLessons(): Promise<CompletedLesson[]> {
    const response = await api.get<CompletedLesson[]>('/users/me/progress/lessons');
    return response.data;
  }
}; 