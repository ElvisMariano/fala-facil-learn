import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticationError } from '@/utils/errors';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { prisma } from '@/lib/prisma';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    role: string;
  };
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError('No token provided');
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new AuthenticationError('Token malformatted');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      role: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    req.user = user;

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid token');
    }

    throw error;
  }
}

export function requireRole(role: string) {
  return async (
    req: AuthenticatedRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ) => {
    if (!req.user) {
      throw new AuthenticationError();
    }

    if (req.user.role !== role) {
      throw new AuthenticationError('Insufficient permissions');
    }

    return next();
  };
} 