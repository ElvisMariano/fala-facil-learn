import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import { AppError } from '../middlewares/errorHandler';

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(401, 'Usuário não autenticado');

    const profile = await this.profileService.getProfile(userId);
    return res.json(profile);
  };

  updateProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(401, 'Usuário não autenticado');

    const { learningGoal, language, notifications } = req.body;
    const profile = await this.profileService.updateProfile(userId, {
      learningGoal,
      language,
      notifications
    });

    return res.json(profile);
  };

  updatePassword = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) throw new AppError(401, 'Usuário não autenticado');

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new AppError(400, 'Senha atual e nova senha são obrigatórias');
    }

    await this.profileService.updatePassword(userId, currentPassword, newPassword);
    return res.json({ message: 'Senha atualizada com sucesso' });
  };
} 