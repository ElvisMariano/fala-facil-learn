import { Router } from 'express';
import { FlashcardController } from '../controllers/flashcard.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();
const flashcardController = new FlashcardController();

router.get('/', flashcardController.getAllDecks);
router.get('/:id', flashcardController.getDeckById);

router.use(authMiddleware);

router.post('/', adminMiddleware, flashcardController.createDeck);
router.put('/:id', adminMiddleware, flashcardController.updateDeck);
router.delete('/:id', adminMiddleware, flashcardController.deleteDeck);

router.post('/:id/cards', adminMiddleware, flashcardController.addCard);
router.put('/:id/cards/:cardId', adminMiddleware, flashcardController.updateCard);
router.delete('/:id/cards/:cardId', adminMiddleware, flashcardController.deleteCard);

router.post('/:id/progress', flashcardController.updateProgress);

export { router as flashcardRoutes }; 