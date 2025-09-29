import z from "zod";
export declare const certificateSchema: z.ZodObject<{
    name: z.ZodString;
    issuer: z.ZodString;
    issue_date: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
    image: z.ZodOptional<z.ZodString>;
    credential: z.ZodString;
}, z.z.core.$strip>;
export declare const updateCertificateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    issuer: z.ZodOptional<z.ZodString>;
    issue_date: z.ZodOptional<z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>>;
    image: z.ZodOptional<z.ZodString>;
    credential: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
//# sourceMappingURL=certificate.d.ts.map