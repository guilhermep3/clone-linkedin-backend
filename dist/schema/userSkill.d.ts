import z from "zod";
export declare const userSkillSchema: z.ZodObject<{
    name: z.ZodString;
    level: z.ZodEnum<{
        beginner: "beginner";
        intermediary: "intermediary";
        advanced: "advanced";
    }>;
}, z.z.core.$strip>;
export declare const updateUserSkillSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodEnum<{
        beginner: "beginner";
        intermediary: "intermediary";
        advanced: "advanced";
    }>>;
}, z.z.core.$strip>;
//# sourceMappingURL=userSkill.d.ts.map