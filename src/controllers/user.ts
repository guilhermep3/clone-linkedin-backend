import type { Response } from "express";
import { findUserByUsername, findUserExperiences, getUserFollowersCount, getUserFollowingCount, getUserPostsCount } from "../services/user.js";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { userPostsSchema } from "../schema/userPosts.js";
import { findPostsByUser } from "../services/post.js";

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const username = req.params.username as string;

  const user = await findUserByUsername(username);
  if (!user) {
    res.status(401).json({ error: 'Usuário não encontrado' });
    return;
  }

  const followingCount = await getUserFollowingCount(user.id);
  const followersCount = await getUserFollowersCount(user.id);
  const postsCount = await getUserPostsCount(user.id);

  res.json({ user, followingCount, followersCount, postsCount });
}

export const getUserPosts = async (req: ExtendedRequest, res: Response) => {
  const username = req.params.username as string;

  const safeData = userPostsSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors })
    return;
  }

  const user = await findUserByUsername(username);
  if (!user) {
    res.json({ error: 'Usuário não encontrado' });
    return;
  }

  let currentPage = 0;
  let perPage = 10;

  const posts = await findPostsByUser(user.id, currentPage, perPage);
  if (!posts) {
    res.json({ error: 'Usuário não tem nenhuma postagem' });
    return;
  }

  res.json({ posts, page: currentPage });
}

export const getUserExperiences = async (req: ExtendedRequest, res: Response) => {
  const username = req.params.username as string;

  const user = await findUserByUsername(username);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  const experiences = await findUserExperiences(user.id);

  res.json({ experiences });
}