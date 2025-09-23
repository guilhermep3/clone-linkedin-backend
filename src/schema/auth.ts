import z from "zod";
import { parseOptionalDate } from "../utils/parseDate.js";

export const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome deve ter no máximo 100 caracteres"),
  username: z.string().min(3, "Usuário muito curto").max(40, "Usuário deve ter no máximo 40 caracteres")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Username pode conter letras, números, _ . -"),
  email: z.string().email("Email inválido").max(100),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(255, "Senha muito longa"),
  profession: z.string().min(1, "Profissão é obrigatória").max(40, "Profissão deve ter no máximo 40 caracteres"),
  phone: z.string().max(20, "Telefone deve ter no máximo 20 caracteres").optional().or(z.literal("")),
  birth_date: parseOptionalDate,
  country: z.string().max(40).optional().or(z.literal("")),
  state: z.string().max(40).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  bio: z.string().max(200).optional().or(z.literal("")),
  about: z.string().optional().or(z.literal("")),
  website: z.string().url("URL inválida").max(200).optional().or(z.literal("")),
  verified: z.boolean().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string({ message: 'Email é obrigatório.' }).email({ message: 'Email inválido' }),
  password: z.string({ message: 'Senha é obrigatória.' }).min(4, 'Mínimo 4 caracteres.')
})