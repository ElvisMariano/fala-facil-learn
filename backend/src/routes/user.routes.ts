import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const userController = new UserController();

router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/progress', userController.getProgress);
router.get('/achievements', userController.getAchievements);

export { router as userRoutes }; 