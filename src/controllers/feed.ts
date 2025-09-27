import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { pageSchema } from "../schema/pageSchema.js";
import { getUserfollowing } from "../services/user.js";
import { findPostsFeed } from "../services/post.js";

export const getFeed = async (req: ExtendedRequest, res: Response) => {
  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const following = await getUserfollowing(req.userFound.id as number);
  const posts = await findPostsFeed(following, currentPage, perPage);

  res.json({ posts, page: currentPage });
}