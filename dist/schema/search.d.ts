import z from "zod";
export declare const searchSchema: z.ZodObject<{
    q: z.ZodString;
    page: z.ZodOptional<z.z.ZodCoercedNumber<unknown>>;
}, z.z.core.$strip>;
//# sourceMappingURL=search.d.ts.map