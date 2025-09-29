import z from "zod";
export declare const vacancieSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    requirements: z.ZodString;
    benefits: z.ZodString;
    salary: z.ZodNumber;
    user_posted_id: z.ZodOptional<z.z.ZodCoercedNumber<unknown>>;
    active: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
export declare const updateVacancieSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
    benefits: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodNumber>;
    user_posted_id: z.ZodOptional<z.z.ZodCoercedNumber<unknown>>;
    active: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=vacancie.d.ts.map