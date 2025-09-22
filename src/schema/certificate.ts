import z from "zod";

export const certificateSchema = z.object({
  name: z.string({ message: 'Nome é obrigatório' }),
  issuer: z.string({ message: 'Emissor é obrigatório' }),
  issue_date: z.date({ message: 'Data de imssão é obrigatório' }),
  image: z.string().optional(),
  credential: z.string({ message: 'Credencial é obrigatória' })
})