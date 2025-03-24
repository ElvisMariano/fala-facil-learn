import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../middlewares/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const profile = await this.userService.getProfile(userId);

    return res.json({
      status: 'success',
      data: { profile }
    });
  };

  updateProfile = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { fullName, avatarUrl, preferences } = req.body;

    const profile = await this.userService.updateProfile(userId, {
      fullName,
      avatarUrl,
      preferences
    });

    return res.json({
      status: 'success',
      data: { profile }
    });
  };

  getProgress = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const progress = await this.userService.getProgress(userId);

    return res.json({
      status: 'success',
      data: { progress }
    });
  };

  getAchievements = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const achievements = await this.userService.getAchievements(userId);

    return res.json({
      status: 'success',
      data: { achievements }
    });
  };
} 