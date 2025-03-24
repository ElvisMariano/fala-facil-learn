import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { AppError } from '../middlewares/errorHandler';

const DEFAULT_ACHIEVEMENTS = [
  {
    title: "Primeiro Passo",
    description: "Complete sua primeira lição",
    category: "iniciante",
    xp: 10,
    target: 1
  },
  {
    title: "Estudante Dedicado",
    description: "Complete 10 lições",
    category: "iniciante",
    xp: 25,
    target: 10
  },
  {
    title: "Mestre das Palavras",
    description: "Aprenda 50 palavras novas",
    category: "vocabulario",
    xp: 50,
    target: 50
  },
  {
    title: "Sequência de 7 Dias",
    description: "Estude por 7 dias consecutivos",
    category: "sequencia",
    xp: 25,
    target: 7
  },
  {
    title: "Sequência de 30 Dias",
    description: "Estude por 30 dias consecutivos",
    category: "sequencia",
    xp: 100,
    target: 30
  },
  {
    title: "Madrugador",
    description: "Complete uma lição antes das 8h da manhã",
    category: "desafio",
    xp: 15,
    target: 1
  },
  {
    title: "Revisor Perfeito",
    description: "Acerte 100% em uma revisão com pelo menos 20 flashcards",
    category: "flashcards",
    xp: 30,
    target: 1
  },
  {
    title: "Nível 5 Alcançado",
    description: "Alcance o nível 5",
    category: "nivel",
    xp: 20,
    target: 5
  },
  {
    title: "Nível 10 Alcançado",
    description: "Alcance o nível 10",
    category: "nivel",
    xp: 50,
    target: 10
  },
  {
    title: "Nível 15 Alcançado",
    description: "Alcance o nível 15",
    category: "nivel",
    xp: 100,
    target: 15
  },
  {
    title: "Compartilhador",
    description: "Compartilhe seu progresso nas redes sociais",
    category: "social",
    xp: 10,
    target: 1
  },
  {
    title: "Gramaticamente Correto",
    description: "Complete todos os exercícios de gramática do nível A1",
    category: "gramatica",
    xp: 50,
    target: 10
  }
];

export class AuthService {
  async register(username: string, email: string, password: string) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      throw new AppError(400, 'Usuário ou email já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with profile in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          profile: {
            create: {} // Will use default values
          }
        }
      });

      // Create default achievements
      await tx.achievement.createMany({
        data: DEFAULT_ACHIEVEMENTS.map(achievement => ({
          ...achievement,
          userId: newUser.id
        }))
      });

      return newUser;
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError(401, 'Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError(401, 'Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );

    return { user, token };
  }
} 