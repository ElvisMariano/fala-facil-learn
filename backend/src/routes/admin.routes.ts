import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();
const adminController = new AdminController();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/stats', adminController.getStats);

export { router as adminRoutes }; 