import z from "zod";
export declare const educationSchema: z.ZodObject<{
    institution: z.ZodString;
    diploma: z.ZodString;
    field_of_study: z.ZodString;
    grade: z.ZodString;
    description: z.ZodString;
    start_date: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
    end_date: z.ZodOptional<z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>>;
    current: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
export declare const updateEducationSchema: z.ZodObject<{
    institution: z.ZodString;
    diploma: z.ZodString;
    field_of_study: z.ZodString;
    grade: z.ZodString;
    description: z.ZodString;
    start_date: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
    end_date: z.ZodOptional<z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>>;
    current: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=education.d.ts.map