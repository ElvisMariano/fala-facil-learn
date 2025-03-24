import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

interface CreateDeckData {
  title: string;
  description?: string;
  level: string;
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

export class FlashcardService {
  async getAllDecks() {
    return await prisma.flashcardDeck.findMany({
      include: {
        cards: true,
      },
    });
  }

  async getDeckById(id: number) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id },
      include: {
        cards: true,
      },
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    return deck;
  }

  async createDeck(data: CreateDeckData) {
    return await prisma.flashcardDeck.create({
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
      where: { id: deckId },
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    return await prisma.flashcard.create({
      data: {
        front: data.front,
        back: data.back,
        example: data.example,
        deckId,
      },
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

  async updateProgress(deckId: number, userId: number, data: UpdateProgressData) {
    const deck = await prisma.flashcardDeck.findUnique({
      where: { id: deckId },
    });

    if (!deck) {
      throw new AppError('Deck not found', 404);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return await prisma.flashcardProgress.upsert({
      where: {
        userId_deckId: {
          userId,
          deckId,
        },
      },
      update: {
        status: data.status,
        score: data.score,
        completedAt: data.status === 'completed' ? new Date() : null,
      },
      create: {
        userId,
        deckId,
        status: data.status,
        score: data.score,
        completedAt: data.status === 'completed' ? new Date() : null,
      },
    });
  }
} 