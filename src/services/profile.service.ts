import api from '../lib/api';

export interface Profile {
  id: number;
  userId: number;
  xp: number;
  level: number;
  streakDays: number;
  lastActivity: Date;
  learningGoal: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    streak: boolean;
    updates: boolean;
  };
}

export interface ProfileUpdateData {
  learningGoal?: string;
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    streak?: boolean;
    updates?: boolean;
  };
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ProfileService = {
  async getProfile(): Promise<Profile> {
    const response = await api.get<Profile>('/users/me/profile');
    return response.data;
  },

  async updateProfile(data: ProfileUpdateData): Promise<Profile> {
    const response = await api.patch<Profile>('/users/me/profile', data);
    return response.data;
  },

  async updatePassword(data: PasswordUpdateData): Promise<void> {
    await api.post('/users/me/password', data);
  }
}; 