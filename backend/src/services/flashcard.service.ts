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

    return decks.map(deck => {
      // Calcular progresso baseado nos cards estudados
      const totalCards = deck.cards.length;
      const studiedCards = deck.progress.length;
      const correctAnswers = deck.progress.filter(p => p.difficulty === 'easy').length;
      const lastStudy = deck.progress.length > 0 
        ? Math.max(...deck.progress.map(p => p.lastStudiedAt.getTime()))
        : deck.createdAt.getTime();

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
          streakDays: 0, // TODO: Implementar cálculo de streak
          lastStudyDate: new Date(lastStudy).toISOString(),
          nextReviewDate: deck.nextReviewDate?.toISOString() || null
        },
        achievements: deck.achievements,
        tags: deck.tags,
        estimatedTimeMinutes: deck.estimatedTimeMinutes
      };
    });
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
        streakDays: 0, // TODO: Implementar cálculo de streak
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
        difficulty
      }
    });

    // Atualizar nextReviewDate do deck baseado no progresso
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: deckId },
      include: {
        cards: true,
        progress: true
      }
    });

    if (deck) {
      const totalCards = deck.cards.length;
      const studiedCards = new Set(deck.progress.map(p => p.cardId)).size;
      
      if (studiedCards === totalCards) {
        // Todos os cards foram estudados, definir próxima revisão
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + 1); // Próxima revisão em 24h
        
        await prisma.flashcardDeck.update({
          where: { id: deckId },
          data: {
            nextReviewDate: nextReview,
            lastStudyDate: new Date()
          }
        });
      }
    }

    return progress;
  }
} 