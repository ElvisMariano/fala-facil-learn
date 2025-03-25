import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateDeckData {
  title: string;
  description?: string;
  level: string;
  category?: string;
  difficulty?: string;
}

interface CreateCardData {
  front: string;
  back: string;
  example?: string;
}

interface UpdateProgressData {
  status: string;
  score?: number;
}

interface DeckProgress {
  totalCards: number;
  completedCards: number;
  correctAnswers: number;
  streakDays: number;
  lastStudyDate: string;
  nextReviewDate: string | null;
}

async function calculateStreak(userId: number): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true
    }
  });

  if (!user?.lastStudyDate) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastStudy = new Date(user.lastStudyDate);
  lastStudy.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today.getTime() - lastStudy.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Se o último estudo foi hoje, mantém o streak atual
  if (diffDays === 0) {
    return user.profile?.streakDays || 1;
  }

  // Se o último estudo foi ontem, incrementa o streak
  if (diffDays === 1) {
    const newStreak = (user.profile?.streakDays || 0) + 1;
    await prisma.profile.update({
      where: { userId },
      data: { streakDays: newStreak }
    });
    return newStreak;
  }

  // Se passou mais de um dia, streak é quebrado
  await prisma.profile.update({
    where: { userId },
    data: { streakDays: 0 }
  });
  return 0;
}

export class FlashcardService {
  async getAllDecks() {
    const decks = await prisma.flashcardDeck.findMany({
      include: {
        cards: true,
        progress: {
          include: {
            card: true
          }
        }
      }
    });

    const transformedDecks = await Promise.all(decks.map(async deck => {
      const totalCards = deck.cards.length;
      const studiedCards = deck.progress.length;
      const correctAnswers = deck.progress.filter(p => p.difficulty === 'easy').length;
      const lastStudy = deck.progress.length > 0 
        ? Math.max(...deck.progress.map(p => p.lastStudiedAt.getTime()))
        : deck.createdAt.getTime();

      // Calcular streak para o usuário atual
      const streakDays = await calculateStreak(deck.progress[0]?.userId || 0);

      return {
        id: deck.id.toString(),
        title: deck.title,
        description: deck.description || '',
        level: deck.level,
        category: deck.category || 'vocabulary',
        difficulty: deck.difficulty,
        locked: deck.locked,
        isFavorite: deck.isFavorite,
        nextReview: deck.nextReviewDate?.toISOString() || null,
        lastPracticed: new Date(lastStudy).toISOString(),
        progress: {
          totalCards,
          completedCards: studiedCards,
          correctAnswers,
          streakDays,
          lastStudyDate: new Date(lastStudy).toISOString(),
          nextReviewDate: deck.nextReviewDate?.toISOString() || null
        },
        achievements: deck.achievements,
        tags: deck.tags,
        estimatedTimeMinutes: deck.estimatedTimeMinutes
      };
    }));

    return transformedDecks;
  }

  async getDeckById(id: number) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id },
      include: {
        cards: true,
        progress: {
          include: {
            card: true
          }
        }
      }
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    // Calcular progresso baseado nos cards estudados
    const totalCards = deck.cards.length;
    const studiedCards = deck.progress.length;
    const correctAnswers = deck.progress.filter(p => p.difficulty === 'easy').length;
    const lastStudy = deck.progress.length > 0 
      ? Math.max(...deck.progress.map(p => p.lastStudiedAt.getTime()))
      : deck.createdAt.getTime();

    // Calcular streak para o usuário atual
    const streakDays = await calculateStreak(deck.progress[0]?.userId || 0);

    return {
      id: deck.id.toString(),
      title: deck.title,
      description: deck.description || '',
      level: deck.level,
      category: deck.category || 'vocabulary',
      difficulty: deck.difficulty,
      locked: deck.locked,
      isFavorite: deck.isFavorite,
      nextReview: deck.nextReviewDate?.toISOString() || null,
      lastPracticed: new Date(lastStudy).toISOString(),
      progress: {
        totalCards,
        completedCards: studiedCards,
        correctAnswers,
        streakDays,
        lastStudyDate: new Date(lastStudy).toISOString(),
        nextReviewDate: deck.nextReviewDate?.toISOString() || null
      },
      achievements: deck.achievements,
      tags: deck.tags,
      estimatedTimeMinutes: deck.estimatedTimeMinutes,
      cards: deck.cards.map(card => ({
        id: card.id.toString(),
        front: card.front,
        back: card.back,
        example: card.example || null
      }))
    };
  }

  async createDeck(data: CreateDeckData) {
    return await prisma.flashcardDeck.create({
      data: {
        title: data.title,
        description: data.description,
        level: data.level,
        category: data.category,
        difficulty: data.difficulty || 'medium'
      },
      include: {
        cards: true
      }
    });
  }

  async updateDeck(id: number, data: CreateDeckData) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id },
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    return await prisma.flashcardDeck.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        level: data.level,
      },
      include: {
        cards: true,
      },
    });
  }

  async deleteDeck(id: number) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id },
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    await prisma.flashcardDeck.delete({
      where: { id },
    });
  }

  async addCard(deckId: number, data: CreateCardData) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: deckId }
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    return await prisma.flashcard.create({
      data: {
        front: data.front,
        back: data.back,
        example: data.example,
        deckId
      }
    });
  }

  async updateCard(deckId: number, cardId: number, data: CreateCardData) {
    const card = await prisma.flashcard.findFirst({
      where: {
        id: cardId,
        deckId,
      },
    });

    if (!card) {
      throw new AppError('Card not found', 404);
    }

    return await prisma.flashcard.update({
      where: { id: cardId },
      data: {
        front: data.front,
        back: data.back,
        example: data.example,
      },
    });
  }

  async deleteCard(deckId: number, cardId: number) {
    const card = await prisma.flashcard.findFirst({
      where: {
        id: cardId,
        deckId,
      },
    });

    if (!card) {
      throw new AppError('Card not found', 404);
    }

    await prisma.flashcard.delete({
      where: { id: cardId },
    });
  }

  async updateProgress(userId: number, deckId: number, cardId: number, difficulty: string) {
    console.log('Iniciando atualização de progresso:', { userId, deckId, cardId, difficulty });

    // Atualizar o progresso do card
    const progress = await prisma.flashcardProgress.upsert({
      where: {
        userId_deckId_cardId: {
          userId,
          deckId,
          cardId
        }
      },
      update: {
        difficulty,
        lastStudiedAt: new Date(),
        studyCount: {
          increment: 1
        }
      },
      create: {
        userId,
        deckId,
        cardId,
        difficulty,
        lastStudiedAt: new Date()
      }
    });

    console.log('Progresso do card atualizado:', progress);

    const now = new Date();

    // Atualizar lastStudyDate do usuário e lastActivity do perfil
    await prisma.user.update({
      where: { id: userId },
      data: { 
        lastStudyDate: now,
        profile: {
          upsert: {
            create: {
              lastActivity: now,
              xp: difficulty === 'easy' ? 10 : 5,
              streakDays: 1
            },
            update: {
              lastActivity: now,
              xp: {
                increment: difficulty === 'easy' ? 10 : 5
              }
            }
          }
        }
      }
    });

    // Atualizar nextReviewDate do deck baseado no progresso
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: deckId },
      include: {
        cards: true,
        progress: {
          where: { userId }
        }
      }
    });

    if (deck) {
      const totalCards = deck.cards.length;
      const studiedCards = new Set(deck.progress.map(p => p.cardId)).size;
      const correctAnswers = deck.progress.filter(p => p.difficulty === 'easy').length;
      
      console.log('Estatísticas do deck:', {
        totalCards,
        studiedCards,
        correctAnswers
      });

      if (studiedCards === totalCards) {
        // Todos os cards foram estudados, definir próxima revisão
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + 1); // Próxima revisão em 24h
        
        await prisma.flashcardDeck.update({
          where: { id: deckId },
          data: {
            nextReviewDate: nextReview,
            lastStudyDate: now
          }
        });
      }
    }

    // Calcular e retornar o streak atualizado
    const streakDays = await calculateStreak(userId);

    // Retornar dados completos do progresso
    return {
      ...progress,
      streakDays,
      totalCards: deck?.cards.length || 0,
      completedCards: deck?.progress.length || 0,
      correctAnswers: deck?.progress.filter(p => p.difficulty === 'easy').length || 0
    };
  }
} 