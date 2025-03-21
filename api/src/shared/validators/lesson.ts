import { z } from 'zod'

export const createLessonSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.string().min(3, 'Categoria deve ter pelo menos 3 caracteres'),
  level: z.string().regex(/^[A-C][1-2]$/, 'Nível deve estar no formato A1, A2, B1, B2, C1 ou C2'),
  content: z.object({
    sections: z.array(z.object({
      title: z.string(),
      type: z.enum(['text', 'video', 'exercise', 'quiz']),
      content: z.any()
    })).min(1, 'A lição deve ter pelo menos uma seção')
  }),
  order: z.number().int().min(0)
})

export const updateLessonSchema = createLessonSchema.partial() 