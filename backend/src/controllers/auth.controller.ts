import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new AppError(400, 'Todos os campos são obrigatórios');
    }

    const user = await this.authService.register(username, email, password);

    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, 'Email e senha são obrigatórios');
    }

    try {
      const { user, token } = await this.authService.login(email, password);

      return res.json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    } catch (error) {
      throw error;
    }
  };
} 