import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'Token não fornecido');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as {
      id: number;
      role: string;
    };

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    return next();
  } catch {
    throw new AppError(401, 'Token inválido');
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new AppError(403, 'Acesso negado');
  }

  return next();
}; 