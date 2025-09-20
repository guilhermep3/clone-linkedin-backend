import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js"

export const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email }
  })

  return user;
}

export const findUserByUsername = async (username: string) => {
  const user = await prisma.users.findFirst({
    where: { username }
  })

  return user;
}

export const createUser = async (data: Prisma.usersCreateInput) => {
  const newUser = await prisma.users.create({
    data
  })

  return newUser;
}

export const getUserFollowingCount = async (id: number) => {
  const followingCount = await prisma.following.count({
    where: { follower_id: id }
  })

  return followingCount;
}

export const getUserFollowersCount = async (id: number) => {
  const followersCount = await prisma.following.count({
    where: { following_id: id }
  })

  return followersCount;
}

export const getUserPostsCount = async (id: number) => {
  const postsCount = await prisma.posts.count({
    where: { user_id: id }
  })

  return postsCount;
}