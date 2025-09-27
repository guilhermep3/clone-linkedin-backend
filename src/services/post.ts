import { prisma } from "../utils/prisma.js"

export const findPostsByUser = async (id: number, currentPage: number, perPage: number) => {
  const posts = await prisma.posts.findMany({
    include: {
      post_likes: {
        select: {
          post_id: true,
          owner_id: true,
        }
      }
    },
    where: { owner_id: id },
    orderBy: { created_at: "desc" },
    skip: currentPage * perPage,
    take: perPage
  })

  return posts;
}

export const findPostsFeed = async (following: number[], currentPage: number, perPage: number) => {
  const posts = await prisma.posts.findMany({
    where: { owner_id: { in: following } },
    orderBy: { created_at: 'desc' },
    skip: currentPage * perPage,
    take: perPage
  })

  return posts;
}

export const findPostByBody = async (q: string, currentPage: number, perPage: number) => {
  const posts = await prisma.posts.findMany({
    where: {
      content: {
        contains: q
      }
    },
    orderBy: { created_at: 'desc' },
    skip: currentPage * perPage,
    take: perPage
  })
  
  return posts;
}