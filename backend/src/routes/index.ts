import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { ProfileController } from '../controllers/profile.controller';
import { AchievementController } from '../controllers/achievement.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();
const authController = new AuthController();
const profileController = new ProfileController();
const achievementController = new AchievementController();

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Protected routes
router.use(authenticateToken);

// Profile routes
router.get('/users/me/profile', profileController.getProfile);
router.patch('/users/me/profile', profileController.updateProfile);
router.post('/users/me/password', profileController.updatePassword);

// Achievement routes
router.get('/users/me/achievements', achievementController.getAchievements);
router.get('/users/me/achievements/stats', achievementController.getStats);

export default router; 