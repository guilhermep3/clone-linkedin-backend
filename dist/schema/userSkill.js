import z from "zod";
export const userSkillSchema = z.object({
    name: z.string({ message: "O nome da skill é obrigatório" }),
    level: z.enum(["beginner", "intermediary", "advanced"], { message: "O nível é obrigatório", })
});
export const updateUserSkillSchema = z.object({
    name: z.string().optional(),
    level: z.enum(["beginner", "intermediary", "advanced"], { message: "Digite beginner, ou intermediary ou advanced", })
        .optional()
});
//# sourceMappingURL=userSkill.js.map