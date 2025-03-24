import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { env } from '@/config/env';
import { ValidationError, AuthenticationError } from '@/utils/errors';

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  async register(req: NextApiRequest, res: NextApiResponse) {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      throw new ValidationError('Invalid input', validation.error);
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      user,
      token,
    });
  }

  async login(req: NextApiRequest, res: NextApiResponse) {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      throw new ValidationError('Invalid input', validation.error);
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }
} 