import { Router } from 'express';
import { LessonController } from '../controllers/lesson.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();
const lessonController = new LessonController();

router.get('/', lessonController.getAll);
router.get('/:id', lessonController.getById);

router.use(authMiddleware);

router.post('/', adminMiddleware, lessonController.create);
router.put('/:id', adminMiddleware, lessonController.update);
router.delete('/:id', adminMiddleware, lessonController.delete);
router.post('/:id/progress', lessonController.updateProgress);

export { router as lessonRoutes }; 