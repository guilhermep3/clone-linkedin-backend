import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";
import type { ownerType } from "../type/extendedRequest.js";

export const findPosts = async (perPage: number, currentPage: number) => {
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
  })

  return users;
}

export const findPostById = async (id: number) => {
  const post = await prisma.posts.findFirst({
    where: { id },
    include: {
      post_media: true,
      post_likes: true,
      post_shares: true,
      post_comments: true
    }
  })

  if (!post) return null;

  const enrichedMedia = await Promise.all(
    post.post_media.map(async media => {
      if (media.owner_type === 'user') {
        const user = await prisma.users.findUnique({
          where: { id: media.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...media, owner: user }
      } else {
        const company = await prisma.companies.findUnique({
          where: { id: media.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...media, owner: company }
      }
    })
  )

  const enrichedLikes = await Promise.all(
    post.post_likes.map(async like => {
      if (like.owner_type === 'user') {
        const user = await prisma.users.findUnique({
          where: { id: like.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...like, owner: user }
      } else {
        const company = await prisma.companies.findUnique({
          where: { id: like.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...like, owner: company }
      }
    })
  )

  const enrichedShares = await Promise.all(
    post.post_shares.map(async shared => {
      if (shared.owner_type === 'user') {
        const user = await prisma.users.findUnique({
          where: { id: shared.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...shared, owner: user }
      } else {
        const company = await prisma.companies.findUnique({
          where: { id: shared.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...shared, owner: company }
      }
    })
  )

  const enrichedComments = await Promise.all(
    post.post_comments.map(async comment => {
      if (comment.owner_type === 'user') {
        const user = await prisma.users.findUnique({
          where: { id: comment.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...comment, owner: user }
      } else {
        const company = await prisma.companies.findUnique({
          where: { id: comment.owner_id },
          select: { id: true, name: true, avatar: true }
        })
        return { ...comment, owner: company }
      }
    })
  )

  return {
    ...post,
    post_media: enrichedMedia,
    post_likes: enrichedLikes,
    post_shares: enrichedShares,
    post_comments: enrichedComments
  };
}

export const findPostCommentaries = async (id: number) => {
  const commentaries = await prisma.post_comments.findMany({
    where: { post_id: id }
  })

  return commentaries;
}

export const createPost = async (data: Prisma.postsCreateInput, owner_id: number, owner_type: ownerType) => {
  const newPost = await prisma.posts.create({
    data: {
      ...data,
      owner_id,
      owner_type
    }
  })

  return newPost;
}

export const createCommentary = async (
  content: string, post_id: number,
  owner_id: number, owner_type: ownerType
) => {
  const newCommentary = await prisma.post_comments.create({
    data: {
      content,
      post_id,
      owner_id,
      owner_type
    }
  })

  return newCommentary;
}

export const checkIfIsLiked = async (post_id: number, owner_id: number, owner_type: ownerType) => {
  const follows = await prisma.post_likes.findFirst({
    where: { post_id, owner_id, owner_type }
  })

  return follows ? true : false;
}

export const like = async (post_id: number, owner_id: number, owner_type: ownerType) => {
  const liked = await prisma.post_likes.create({
    data: { post_id, owner_id, owner_type }
  })

  return liked;
}
export const unlike = async (post_id: number, owner_id: number, owner_type: ownerType) => {
  const unliked = await prisma.post_likes.deleteMany({
    where: { post_id, owner_id, owner_type }
  })

  return unliked;
}

export const checkIfIsShared = async (post_id: number, owner_id: number, owner_type: ownerType) => {
  const shared = await prisma.post_shares.findFirst({
    where: { post_id, owner_id, owner_type }
  })

  return shared ? true : false;
}

export const share = async (post_id: number, owner_id: number) => {
  const shared = await prisma.post_shares.create({
    data: { post_id, owner_id }
  })

  return shared;
}
export const unshare = async (post_id: number, owner_id: number) => {
  const unshared = await prisma.post_shares.deleteMany({
    where: { post_id, owner_id }
  })

  return unshared;
}

export const updatePostById = async (data: Prisma.postsUpdateInput, id: number) => {
  const postUpdated = await prisma.posts.update({
    data,
    where: { id }
  })

  return postUpdated;
}

export const deletePostById = async (id: number) => {
  await prisma.posts.delete({
    where: { id }
  })
}

export const deleteCommentaryById = async (id: number) => {
  await prisma.post_comments.delete({
    where: { id }
  })
}