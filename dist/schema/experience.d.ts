import z from "zod";
export declare const experienceSchema: z.ZodObject<{
    company_id: z.ZodNumber;
    role: z.ZodString;
    description: z.ZodString;
    start_date: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
    end_date: z.ZodOptional<z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>>;
    current: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
export declare const experienceSkillSchema: z.ZodObject<{
    experience_id: z.ZodNumber;
    user_skill_id: z.ZodNumber;
}, z.z.core.$strip>;
export declare const updateExperienceSchema: z.ZodObject<{
    company_id: z.ZodOptional<z.ZodNumber>;
    role: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    start_date: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
    end_date: z.ZodOptional<z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>>;
    current: z.ZodOptional<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=experience.d.ts.map