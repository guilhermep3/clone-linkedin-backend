import type { Response } from "express";
import type { ExtendedRequest, ownerType } from "../type/extendedRequest.js";
import { pageSchema } from "../schema/userPosts.js";
import {
  checkIfIsLiked, checkIfIsShared, checkIfIsUserCommentary, checkIfIsUserPost, createCommentary, createPost,
  deleteCommentaryById, deletePostById, findPostById, findPostCommentaries,
  findPosts, like, share, unlike, unshare,
  updatePostById
} from "../services/posts.js";
import { commentarySchema, postSchema, updatePostSchema } from "../schema/post.js";
import type { Prisma } from "@prisma/client";
import { createNotification } from "../services/notification.js";

export const getPosts = async (req: ExtendedRequest, res: Response) => {
  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    return;
  }
  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const posts = await findPosts(perPage, currentPage);

  res.json({ posts, page: currentPage });
}

export const getPost = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const post = await findPostById(id);
  if (!post) {
    res.status(404).json({ error: 'Postagem não encontrada' });
    return;
  }

  res.json({ post });
}

export const getCommentaries = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const hasPost = await findPostById(id);
  if (!hasPost) {
    res.status(404).json({ error: 'Postagem não encontrada' });
    return;
  }

  const commentaries = await findPostCommentaries(id);

  res.json({ commentaries });
}

export const addPost = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const safeData = postSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const newPost = await createPost(
    safeData.data as Prisma.postsCreateInput,
    user.id as number,
    req.accountType as ownerType
  );

  res.json({ newPost });
}

export const addCommentary = async (req: ExtendedRequest, res: Response) => {
  const post_id = parseInt(req.params.id as string);
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
    actor_id: user.id as number,
    actor_type: req.accountType as ownerType,
    type: "Comment",
    entity_id: post_id,
    entity_type: "Post",
    message: "comentou em sua postagem"
  });

  const newCommentary = await createCommentary(
    safeData.data.content,
    post_id,
    user.id as number,
    req.accountType as ownerType
  );

  res.json({ newCommentary });
}

export const likeToggle = async (req: ExtendedRequest, res: Response) => {
  const post_id = parseInt(req.params.id as string);
  const user = req.userFound;

  const hasPost = await findPostById(post_id);
  if (!hasPost) {
    res.status(400).json({ error: 'Postagem não existe' });
    return;
  }

  await createNotification({
    user_id: hasPost.owner_id,
    actor_id: user.id as number,
    actor_type: req.accountType as ownerType,
    type: "Like",
    entity_id: post_id,
    entity_type: "Post",
    message: "curtiu sua postagem"
  });

  const isLiked = await checkIfIsLiked(post_id, user.id, req.accountType as ownerType);
  if (!isLiked) {
    await like(post_id, user.id, req.accountType as ownerType);
    res.json({ liked: true });
    return;
  } else {
    await unlike(post_id, user.id, req.accountType as ownerType);
    res.json({ liked: false });
    return;
  }
}

export const shareToggle = async (req: ExtendedRequest, res: Response) => {
  const post_id = parseInt(req.params.id as string);
  const user = req.userFound;

  const hasPost = await findPostById(post_id);
  if (!hasPost) {
    res.status(400).json({ error: 'Postagem não existe' });
    return;
  }

  await createNotification({
    user_id: hasPost.owner_id,
    actor_id: user.id as number,
    actor_type: req.accountType as ownerType,
    type: "Like",
    entity_id: post_id,
    entity_type: "Post",
    message: "compartilhou sua postagem"
  });

  const isShared = await checkIfIsShared(post_id, user.id, req.accountType as ownerType);
  if (!isShared) {
    await share(post_id, user.id, req.accountType as ownerType);
    res.json({ shared: true });
    return;
  } else {
    await unshare(post_id, user.id, req.accountType as ownerType);
    res.json({ shared: false });
    return;
  }
}

export const updatePost = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updatePostSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const postUpdated = await updatePostById(safeData.data as Prisma.postsUpdateInput, id);

  res.json({ postUpdated });
}

export const deletePost = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);
  const owner_id = req.userFound.id;
  const owner_type = req.accountType as ownerType;

  const isUserPost = await checkIfIsUserPost(id, owner_id, owner_type);
  if (!isUserPost) {
    res.status(400).json({ error: 'A postagem não é do usuario logado' });
    return;
  }

  try {
    await deletePostById(id);
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar postagem', errorDetails: error })
  }
}

export const deleteCommentary = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);
  const idcomment = parseInt(req.params.idcomment as string);
  const owner_id = req.userFound.id;
  const owner_type = req.accountType as ownerType;

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
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar comentário', errorDetails: error })
  }
}
