import { findPostByBody } from "../services/post.js";
import { searchSchema } from "../schema/search.js";
export const searchPosts = async (req, res) => {
    const safeData = searchSchema.safeParse(req.query);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    let perPage = 10;
    let currentPage = safeData.data.page ?? 0;
    const posts = await findPostByBody(safeData.data.q, currentPage, perPage);
    res.json({ posts, page: currentPage });
};
//# sourceMappingURL=search.js.map