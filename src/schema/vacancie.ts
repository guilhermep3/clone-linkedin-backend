import z from "zod";

export const vacancieSchema = z.object({
  title: z.string('Título é obrigatório').max(255, 'Máximo de 255 caracteres'),
  description: z.string('Descrição é obrigatório').max(1000, 'Máximo de 1000 caracteres'),
  requirements: z.string('Requirimentos é obrigatório').max(1000, 'Máximo de 1000 caracteres'),
  benefits: z.string('Benefícios é obrigatório').max(1000, 'Máximo de 1000 caracteres'),
  salary: z.number('Benefícios é obrigatório'),
  user_posted_id: z.coerce.number().optional(),
  active: z.boolean()?.default(true)
})

export const updateVacancieSchema = z.object({
  title: z.string().max(255, 'Máximo de 255 caracteres').optional(),
  description: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
  requirements: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
  benefits: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
  salary: z.number().optional(),
  user_posted_id: z.coerce.number().optional(),
  active: z.boolean().default(true)
})
