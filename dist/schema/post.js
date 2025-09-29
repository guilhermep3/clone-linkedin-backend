import z from "zod";
export const postSchema = z.object({
    content: z.string({ message: 'Conteúdo da postagem é obrigatório' }),
    visible: z.boolean().default(true),
});
export const commentarySchema = z.object({
    content: z.string({ message: 'Conteúdo da postagem é obrigatório' }),
});
export const updatePostSchema = z.object({
    content: z.string().optional(),
    visible: z.boolean().default(true),
});
//# sourceMappingURL=post.js.map