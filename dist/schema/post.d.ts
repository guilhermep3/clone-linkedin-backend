import z from "zod";
export declare const postSchema: z.ZodObject<{
    content: z.ZodString;
    visible: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
export declare const commentarySchema: z.ZodObject<{
    content: z.ZodString;
}, z.z.core.$strip>;
export declare const updatePostSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    visible: z.ZodDefault<z.ZodBoolean>;
}, z.z.core.$strip>;
//# sourceMappingURL=post.d.ts.map