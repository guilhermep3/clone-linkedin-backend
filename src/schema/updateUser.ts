import z from "zod";
import { parseOptionalDate } from "../utils/parseDate.js";

export const updateUserSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres").optional(),
  username: z.string().min(3, "Mínimo 3 caracteres").max(40, "Usuário deve ter no máximo 40 caracteres")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Username só pode conter letras, números, _ . -").optional(),
  email: z.string().email("Email inválido").max(100).optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(255, "Senha muito longa").optional(),
  profession: z.string().min(2, "Mínimo 2 caracteres").max(40, "Profissão deve ter no máximo 40 caracteres").optional(),
  phone: z.string().max(20, "Telefone deve ter no máximo 20 caracteres").optional().or(z.literal("")),
  birth_date: parseOptionalDate.optional(),
  country: z.string().max(40, 'Máximo 40 caracteres').optional().or(z.literal("")),
  state: z.string().max(40, 'Máximo 40 caracteres').optional().or(z.literal("")),
  city: z.string().max(80, 'Máximo 80 caracteres').optional().or(z.literal("")),
  bio: z.string().max(200, 'Máximo 200 caracteres').optional().or(z.literal("")),
  about: z.string().optional().or(z.literal("")),
  website: z.string().url("URL inválida").max(200).optional().or(z.literal("")),
  verified: z.boolean().optional(),
});
