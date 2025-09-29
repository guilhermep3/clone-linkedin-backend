import { pageSchema } from "../schema/pageSchema.js";
import { checkIfIsLiked, checkIfIsShared, checkIfIsUserCommentary, checkIfIsUserPost, createCommentary, createPost, deleteCommentaryById, deletePostById, findPostById, findPostCommentaries, findPosts, like, share, unlike, unshare, updatePostById } from "../services/posts.js";
import { commentarySchema, postSchema, updatePostSchema } from "../schema/post.js";
import { createNotification } from "../services/notification.js";
export const getPosts = async (req, res) => {
    const safeData = pageSchema.safeParse(req.query);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    let perPage = 10;
    let currentPage = safeData.data.page ?? 0;
    const posts = await findPosts(perPage, currentPage);
    res.json({ posts, page: currentPage });
};
export const getPost = async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await findPostById(id);
    if (!post) {
        res.status(404).json({ error: 'Postagem não encontrada' });
        return;
    }
    res.json({ post });
};
export const getCommentaries = async (req, res) => {
    const id = parseInt(req.params.id);
    const hasPost = await findPostById(id);
    if (!hasPost) {
        res.status(404).json({ error: 'Postagem não encontrada' });
        return;
    }
    const commentaries = await findPostCommentaries(id);
    res.json({ commentaries });
};
export const addPost = async (req, res) => {
    const user = req.userFound;
    const safeData = postSchema.safeParse(req.body);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const newPost = await createPost(safeData.data, user.id, req.accountType);
    res.json({ newPost });
};
export const addCommentary = async (req, res) => {
    const post_id = parseInt(req.params.id);
    const user = req.userFound;
    const safeData = commentarySchema.safeParse(req.body);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const hasPost = await findPostById(post_id);
    if (!hasPost) {
        res.status(404).json({ error: 'Postagem não existe' });
        return;
    }
    await createNotification({
        user_id: hasPost.owner_id,
        actor_id: user.id,
        actor_type: req.accountType,
        type: "Comment",
        entity_id: post_id,
        entity_type: "Post",
        message: "comentou em sua postagem"
    });
    const newCommentary = await createCommentary(safeData.data.content, post_id, user.id, req.accountType);
    res.json({ newCommentary });
};
export const likeToggle = async (req, res) => {
    const post_id = parseInt(req.params.id);
    const user = req.userFound;
    const hasPost = await findPostById(post_id);
    if (!hasPost) {
        res.status(400).json({ error: 'Postagem não existe' });
        return;
    }
    await createNotification({
        user_id: hasPost.owner_id,
        actor_id: user.id,
        actor_type: req.accountType,
        type: "Like",
        entity_id: post_id,
        entity_type: "Post",
        message: "curtiu sua postagem"
    });
    const isLiked = await checkIfIsLiked(post_id, user.id, req.accountType);
    if (!isLiked) {
        await like(post_id, user.id, req.accountType);
        res.json({ liked: true });
        return;
    }
    else {
        await unlike(post_id, user.id, req.accountType);
        res.json({ liked: false });
        return;
    }
};
export const shareToggle = async (req, res) => {
    const post_id = parseInt(req.params.id);
    const user = req.userFound;
    const hasPost = await findPostById(post_id);
    if (!hasPost) {
        res.status(400).json({ error: 'Postagem não existe' });
        return;
    }
    await createNotification({
        user_id: hasPost.owner_id,
        actor_id: user.id,
        actor_type: req.accountType,
        type: "Like",
        entity_id: post_id,
        entity_type: "Post",
        message: "compartilhou sua postagem"
    });
    const isShared = await checkIfIsShared(post_id, user.id, req.accountType);
    if (!isShared) {
        await share(post_id, user.id, req.accountType);
        res.json({ shared: true });
        return;
    }
    else {
        await unshare(post_id, user.id, req.accountType);
        res.json({ shared: false });
        return;
    }
};
export const updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const safeData = updatePostSchema.safeParse(req.body);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const postUpdated = await updatePostById(safeData.data, id);
    res.json({ postUpdated });
};
export const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const owner_id = req.userFound.id;
    const owner_type = req.accountType;
    const isUserPost = await checkIfIsUserPost(id, owner_id, owner_type);
    if (!isUserPost) {
        res.status(400).json({ error: 'A postagem não é do usuario logado' });
        return;
    }
    try {
        await deletePostById(id);
        res.json({ deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar postagem', errorDetails: error });
    }
};
export const deleteCommentary = async (req, res) => {
    const id = parseInt(req.params.id);
    const idcomment = parseInt(req.params.idcomment);
    const owner_id = req.userFound.id;
    const owner_type = req.accountType;
    const hasPost = await findPostById(id);
    if (!hasPost) {
        res.status(400).json({ error: 'Postagem não existe' });
        return;
    }
    const isUserCommentary = await checkIfIsUserCommentary(id, owner_id, owner_type);
    if (!isUserCommentary) {
        res.status(400).json({ error: 'A postagem não é do usuario logado' });
        return;
    }
    try {
        await deleteCommentaryById(idcomment);
        res.json({ deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar comentário', errorDetails: error });
    }
};
//# sourceMappingURL=post.js.map