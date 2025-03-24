import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { lessonRoutes } from './routes/lesson.routes';
import { flashcardRoutes } from './routes/flashcard.routes';
import { adminRoutes } from './routes/admin.routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✨ Server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- GET  /api/health');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('- GET  /api/users/me');
  console.log('- GET  /api/lessons');
  console.log('- GET  /api/flashcards');
}); 