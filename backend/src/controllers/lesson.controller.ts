import { Request, Response } from 'express';
import { LessonService } from '../services/lesson.service';
import { AppError } from '../middlewares/errorHandler';

export class LessonController {
  private lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  getAll = async (req: Request, res: Response) => {
    const { category, level, status } = req.query;
    const lessons = await this.lessonService.getAll({
      category: category as string,
      level: level as string,
      status: status as string
    });

    return res.json({
      status: 'success',
      data: { lessons }
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const lesson = await this.lessonService.getById(Number(id));

    return res.json({
      status: 'success',
      data: { lesson }
    });
  };

  create = async (req: Request, res: Response) => {
    const { title, description, level, category, content } = req.body;

    if (!title || !level || !category || !content) {
      throw new AppError(400, 'Todos os campos obrigatórios devem ser preenchidos');
    }

    const lesson = await this.lessonService.create({
      title,
      description,
      level,
      category,
      content
    });

    return res.status(201).json({
      status: 'success',
      data: { lesson }
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, level, category, content, status } = req.body;

    const lesson = await this.lessonService.update(Number(id), {
      title,
      description,
      level,
      category,
      content,
      status
    });

    return res.json({
      status: 'success',
      data: { lesson }
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.lessonService.delete(Number(id));

    return res.status(204).send();
  };

  updateProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const { status, score } = req.body;

    const progress = await this.lessonService.updateProgress(Number(id), userId, {
      status,
      score
    });

    return res.json({
      status: 'success',
      data: { progress }
    });
  };
} 