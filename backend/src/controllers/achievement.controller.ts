import { Request, Response } from 'express';
import { AchievementService } from '../services/achievement.service';
import { AppError } from '../middlewares/errorHandler';

export class AchievementController {
  private achievementService: AchievementService;

  constructor() {
    this.achievementService = new AchievementService();
  }

  getAchievements = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(401, 'Usuário não autenticado');

    const achievements = await this.achievementService.getAchievements(userId);
    return res.json(achievements);
  };

  getStats = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(401, 'Usuário não autenticado');

    const stats = await this.achievementService.getStats(userId);
    return res.json(stats);
  };
} 