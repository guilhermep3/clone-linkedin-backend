import z from "zod";
import { parseOptionalDate } from "../utils/parseDate.js";
export const experienceSchema = z.object({
    company_id: z.number({ message: 'id da empresa é obrigatório' }),
    role: z.string({ message: 'Cargo é obrigatório' })
        .min(2, 'Mínimo 2 caracteres').max(100, 'Máximo de 100 caracteres'),
    description: z.string({ message: 'Descrição é obrigatória' }),
    start_date: parseOptionalDate,
    end_date: parseOptionalDate.optional(),
    current: z.boolean().default(false)
});
export const experienceSkillSchema = z.object({
    experience_id: z.number({ message: 'experiência é obrigatório' }),
    user_skill_id: z.number({ message: 'competência é obrigatório' })
});
export const updateExperienceSchema = z.object({
    company_id: z.number().optional(),
    role: z.string()
        .min(2, 'Mínimo 2 caracteres').max(100, 'Máximo de 100 caracteres').optional(),
    description: z.string().optional(),
    start_date: parseOptionalDate,
    end_date: parseOptionalDate.optional(),
    current: z.boolean().optional()
});
//# sourceMappingURL=experience.js.map