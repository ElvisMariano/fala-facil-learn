import api from '../lib/api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  profile: {
    fullName: string | null;
    avatarUrl: string | null;
    level: string;
    xpPoints: number;
  };
}

export interface UserDetails extends User {
  lessonProgress: Array<{
    lesson: {
      id: number;
      title: string;
    };
    status: string;
    score: number | null;
    completedAt: string | null;
  }>;
  flashcardProgress: Array<{
    flashcardDeck: {
      id: number;
      title: string;
    };
    status: string;
    score: number | null;
    completedAt: string | null;
  }>;
  userAchievements: Array<{
    achievement: {
      id: number;
      title: string;
      description: string | null;
      points: number;
    };
    earnedAt: string;
  }>;
}

export interface Stats {
  users: {
    total: number;
  };
  lessons: {
    total: number;
    completed: number;
  };
  flashcards: {
    total: number;
    completed: number;
  };
  achievements: {
    total: number;
  };
}

export interface UserUpdateData {
  username?: string;
  email?: string;
  role?: string;
}

export const AdminService = {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<{ status: string; data: { users: User[] } }>('/admin/users');
    return response.data.data.users;
  },

  async getUserById(id: number): Promise<UserDetails> {
    const response = await api.get<{ status: string; data: { user: UserDetails } }>(`/admin/users/${id}`);
    return response.data.data.user;
  },

  async updateUser(id: number, data: UserUpdateData): Promise<User> {
    const response = await api.put<{ status: string; data: { user: User } }>(`/admin/users/${id}`, data);
    return response.data.data.user;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },

  async getStats(): Promise<Stats> {
    const response = await api.get<{ status: string; data: { stats: Stats } }>('/admin/stats');
    return response.data.data.stats;
  }
}; 