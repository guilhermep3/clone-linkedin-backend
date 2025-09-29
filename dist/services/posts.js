import { prisma } from "../utils/prisma.js";
export const findPosts = async (perPage, currentPage) => {
    const users = await prisma.posts.findMany({
        include: {
            post_media: {
                select: {
                    id: true,
                    media_url: true,
                    media_type: true,
                    owner_id: true,
                    owner_type: true,
                }
            },
            post_likes: {
                select: {
                    id: true,
                    owner_id: true,
                    owner_type: true,
                    created_at: true
                },
            },
            post_shares: {
                select: {
                    id: true,
                    owner_id: true,
                    owner_type: true,
                    created_at: true
                }
            },
            post_comments: {
                select: {
                    id: true,
                    owner_id: true,
                    owner_type: true,
                    content: true,
                    created_at: true
                }
            }
        },
        skip: currentPage * perPage,
        take: perPage
    });
    return users;
};
export const findPostById = async (id) => {
    const post = await prisma.posts.findFirst({
        where: { id },
        include: {
            post_media: true,
            post_likes: true,
            post_shares: true,
            post_comments: true
        }
    });
    if (!post)
        return null;
    const enrichedMedia = await Promise.all(post.post_media.map(async (media) => {
        if (media.owner_type === 'user') {
            const user = await prisma.users.findUnique({
                where: { id: media.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...media, owner: user };
        }
        else {
            const company = await prisma.companies.findUnique({
                where: { id: media.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...media, owner: company };
        }
    }));
    const enrichedLikes = await Promise.all(post.post_likes.map(async (like) => {
        if (like.owner_type === 'user') {
            const user = await prisma.users.findUnique({
                where: { id: like.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...like, owner: user };
        }
        else {
            const company = await prisma.companies.findUnique({
                where: { id: like.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...like, owner: company };
        }
    }));
    const enrichedShares = await Promise.all(post.post_shares.map(async (shared) => {
        if (shared.owner_type === 'user') {
            const user = await prisma.users.findUnique({
                where: { id: shared.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...shared, owner: user };
        }
        else {
            const company = await prisma.companies.findUnique({
                where: { id: shared.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...shared, owner: company };
        }
    }));
    const enrichedComments = await Promise.all(post.post_comments.map(async (comment) => {
        if (comment.owner_type === 'user') {
            const user = await prisma.users.findUnique({
                where: { id: comment.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...comment, owner: user };
        }
        else {
            const company = await prisma.companies.findUnique({
                where: { id: comment.owner_id },
                select: { id: true, name: true, avatar: true }
            });
            return { ...comment, owner: company };
        }
    }));
    return {
        ...post,
        post_media: enrichedMedia,
        post_likes: enrichedLikes,
        post_shares: enrichedShares,
        post_comments: enrichedComments
    };
};
export const findPostCommentaries = async (id) => {
    const commentaries = await prisma.post_comments.findMany({
        where: { post_id: id }
    });
    return commentaries;
};
export const createPost = async (data, owner_id, owner_type) => {
    const newPost = await prisma.posts.create({
        data: {
            ...data,
            owner_id,
            owner_type
        }
    });
    return newPost;
};
export const createCommentary = async (content, post_id, owner_id, owner_type) => {
    const newCommentary = await prisma.post_comments.create({
        data: {
            content,
            post_id,
            owner_id,
            owner_type
        }
    });
    return newCommentary;
};
export const checkIfIsLiked = async (post_id, owner_id, owner_type) => {
    const follows = await prisma.post_likes.findFirst({
        where: { post_id, owner_id, owner_type }
    });
    return follows ? true : false;
};
export const like = async (post_id, owner_id, owner_type) => {
    const liked = await prisma.post_likes.create({
        data: { post_id, owner_id, owner_type }
    });
    return liked;
};
export const unlike = async (post_id, owner_id, owner_type) => {
    const unliked = await prisma.post_likes.deleteMany({
        where: { post_id, owner_id, owner_type }
    });
    return unliked;
};
export const checkIfIsShared = async (post_id, owner_id, owner_type) => {
    const shared = await prisma.post_shares.findFirst({
        where: { post_id, owner_id, owner_type }
    });
    return shared ? true : false;
};
export const share = async (post_id, owner_id, owner_type) => {
    const shared = await prisma.post_shares.create({
        data: { post_id, owner_id, owner_type }
    });
    return shared;
};
export const unshare = async (post_id, owner_id, owner_type) => {
    const unshared = await prisma.post_shares.deleteMany({
        where: { post_id, owner_id, owner_type }
    });
    return unshared;
};
export const updatePostById = async (data, id) => {
    const postUpdated = await prisma.posts.update({
        data,
        where: { id }
    });
    return postUpdated;
};
export const checkIfIsUserPost = async (id, owner_id, owner_type) => {
    const isUserPost = await prisma.posts.findFirst({
        where: { id, owner_id, owner_type }
    });
    return isUserPost ? true : false;
};
export const checkIfIsUserCommentary = async (id, owner_id, owner_type) => {
    const isUserCommentary = await prisma.post_comments.findFirst({
        where: { id, owner_id, owner_type }
    });
    return isUserCommentary ? true : false;
};
export const deletePostById = async (id) => {
    await prisma.posts.delete({
        where: { id }
    });
};
export const deleteCommentaryById = async (id) => {
    await prisma.post_comments.delete({
        where: { id }
    });
};
//# sourceMappingURL=posts.js.map