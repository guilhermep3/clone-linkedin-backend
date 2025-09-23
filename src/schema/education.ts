import z from "zod";
import { parseOptionalDate } from "../utils/parseDate.js";

export const educationSchema = z.object({
  institution: z.string({ message: 'Institutição é obrigatória' }).max(80, 'Máximo 80 caracteres'),
  diploma: z.string({ message: 'Diploma é obrigatório' }).max(80, 'Máximo 80 caracteres'),
  field_of_study: z.string({ message: 'Área de estudo é obrigatório' }).max(80, 'Máximo 80 caracteres'),
  grade: z.string({ message: 'Nota é obrigatória' }).max(20, 'Máximo 20 caracteres'),
  description: z.string({ message: 'Descrição é obrigatória' }).max(255, 'Máximo 255 caracteres'),
  start_date: parseOptionalDate,
  end_date: parseOptionalDate.optional(),
  current: z.boolean().default(false)
}).refine((data) => {
  if (data.current && data.end_date) return false;
  if (!data.current && !data.end_date) return false;
  return true;
}, { message: "Preencha somente um campo entre end_date e current", path: ["end_date"] })

export const updateEducationSchema = z.object({
  institution: z.string().max(80, 'Máximo 80 caracteres'),
  diploma: z.string().max(80, 'Máximo 80 caracteres'),
  field_of_study: z.string().max(80, 'Máximo 80 caracteres'),
  grade: z.string().max(20, 'Máximo 20 caracteres'),
  description: z.string().max(255, 'Máximo 255 caracteres'),
  start_date: parseOptionalDate,
  end_date: parseOptionalDate.optional(),
  current: z.boolean().default(false)
})