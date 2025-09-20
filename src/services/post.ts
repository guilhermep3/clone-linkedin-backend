import { prisma } from "../utils/prisma.js"

export const findPostsByUser = async (id: number, currentPage: number, perPage: number) => {
  const posts = await prisma.posts.findMany({
    include: {
      post_likes: {
        select: {
          post_id: true,
          user_id: true,
        }
      }
    },
    where: { user_id: id },
    orderBy: { created_at: "desc" },
    skip: currentPage * perPage,
    take: perPage
  })

  return posts;
}