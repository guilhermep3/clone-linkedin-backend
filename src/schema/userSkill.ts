import z from "zod";

export const userSkillSchema = z.object({
  name: z.string({ message: "O nome da skill é obrigatório" }),
  level: z.enum(["beginner", "intermediary", "advanced"], { message: "O nível é obrigatório", })
});
