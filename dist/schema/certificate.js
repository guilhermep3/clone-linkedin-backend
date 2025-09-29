import z from "zod";
import { parseOptionalDate } from "../utils/parseDate.js";
export const certificateSchema = z.object({
    name: z.string({ message: 'Nome é obrigatório' }).min(2, 'Máximo 2 caracteres').max(80, 'Máximo 80 caracteres'),
    issuer: z.string({ message: 'Emissor é obrigatório' }).max(80, 'Máximo 80 caracteres'),
    issue_date: parseOptionalDate,
    image: z.string().optional(),
    credential: z.string({ message: 'Credencial é obrigatória' }).max(200, 'Máximo 200 caracteres')
});
export const updateCertificateSchema = z.object({
    name: z.string().min(2, 'Máximo 2 caracteres').max(80, 'Máximo 80 caracteres').optional(),
    issuer: z.string().max(80, 'Máximo 80 caracteres').optional(),
    issue_date: parseOptionalDate.optional(),
    image: z.string().optional(),
    credential: z.string().max(200, 'Máximo 200 caracteres').optional()
});
//# sourceMappingURL=certificate.js.map