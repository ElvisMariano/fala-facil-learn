import { Request, Response } from 'express';
import { FlashcardService } from '../services/flashcard.service';
import { AppError } from '../utils/AppError';

export class FlashcardController {
  private flashcardService: FlashcardService;

  constructor() {
    this.flashcardService = new FlashcardService();
  }

  getAllDecks = async (req: Request, res: Response) => {
    try {
      const decks = await this.flashcardService.getAllDecks();
      return res.json({ status: 'success', data: { decks } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  getDeckById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deck = await this.flashcardService.getDeckById(Number(id));
      return res.json({ status: 'success', data: { deck } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  createDeck = async (req: Request, res: Response) => {
    try {
      const { title, description, level } = req.body;
      const deck = await this.flashcardService.createDeck({ title, description, level });
      return res.status(201).json({ status: 'success', data: { deck } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  updateDeck = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, level } = req.body;
      const deck = await this.flashcardService.updateDeck(Number(id), { title, description, level });
      return res.json({ status: 'success', data: { deck } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  deleteDeck = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.flashcardService.deleteDeck(Number(id));
      return res.json({ status: 'success', message: 'Deck deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  addCard = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { front, back, example } = req.body;
      const card = await this.flashcardService.addCard(Number(id), { front, back, example });
      return res.status(201).json({ status: 'success', data: { card } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  updateCard = async (req: Request, res: Response) => {
    try {
      const { id, cardId } = req.params;
      const { front, back, example } = req.body;
      const card = await this.flashcardService.updateCard(Number(id), Number(cardId), { front, back, example });
      return res.json({ status: 'success', data: { card } });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  deleteCard = async (req: Request, res: Response) => {
    try {
      const { id, cardId } = req.params;
      await this.flashcardService.deleteCard(Number(id), Number(cardId));
      return res.json({ status: 'success', message: 'Card deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };

  updateProgress = async (req: Request, res: Response) => {
    try {
      const { id: deckId } = req.params;
      const { cardId, difficulty } = req.body;
      const userId = req.user?.id; // Assumindo que o ID do usuário está disponível através do middleware de autenticação

      if (!userId) {
        return res.status(401).json({ status: 'error', message: 'User not authenticated' });
      }

      const progress = await this.flashcardService.updateProgress(
        Number(userId),
        Number(deckId),
        Number(cardId),
        difficulty
      );

      return res.json({
        status: 'success',
        data: {
          progress: {
            ...progress,
            userId: progress.userId.toString(),
            deckId: progress.deckId.toString(),
            cardId: progress.cardId.toString()
          }
        }
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: 'error', message: error.message });
      }
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };
} 