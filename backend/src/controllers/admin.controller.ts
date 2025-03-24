import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AppError } from '../middlewares/errorHandler';

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.adminService.getAllUsers();

    return res.json({
      status: 'success',
      data: { users }
    });
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.adminService.getUserById(Number(id));

    return res.json({
      status: 'success',
      data: { user }
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await this.adminService.updateUser(Number(id), {
      username,
      email,
      role
    });

    return res.json({
      status: 'success',
      data: { user }
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.adminService.deleteUser(Number(id));

    return res.status(204).send();
  };

  getStats = async (req: Request, res: Response) => {
    const stats = await this.adminService.getStats();

    return res.json({
      status: 'success',
      data: { stats }
    });
  };
} 