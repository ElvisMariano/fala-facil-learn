import { Router } from 'express';
import { FlashcardController } from '../controllers/flashcard.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const flashcardController = new FlashcardController();

// Rotas públicas
router.get('/', flashcardController.getAllDecks);
router.get('/:id', flashcardController.getDeckById);
router.get('/:id/cards', flashcardController.getCards);

// Rotas que requerem autenticação
router.post('/:id/progress', authMiddleware, flashcardController.updateProgress);

// Rotas que requerem admin
router.post('/', adminMiddleware, flashcardController.createDeck);
router.put('/:id', adminMiddleware, flashcardController.updateDeck);
router.delete('/:id', adminMiddleware, flashcardController.deleteDeck);
router.post('/:id/cards', adminMiddleware, flashcardController.createCard);
router.put('/:id/cards/:cardId', adminMiddleware, flashcardController.updateCard);
router.delete('/:id/cards/:cardId', adminMiddleware, flashcardController.deleteCard);

export default router; 