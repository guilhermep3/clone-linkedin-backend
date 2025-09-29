import z from "zod";
/**
 * Pré-processador para aceitar data enviada como string (ex: "1990-01-01")
 * e transformar em Date, ou aceitar undefined/null.
 */
export declare const parseOptionalDate: z.ZodPipe<z.ZodTransform<string | Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
//# sourceMappingURL=parseDate.d.ts.map