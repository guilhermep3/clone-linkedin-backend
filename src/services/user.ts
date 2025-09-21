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

export const findUserExperiences = async (id: number) => {
  const experiences = await prisma.experiences.findMany({
    where: { user_id: id },
    include: {
      experience_skills: {
        select: {
          id: true,
          name: true,
          level: true,
          experience_validations: {
            select: {
              id: true,
              company_id: true,
              companies: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  avatar: true,
                }
              }
            }
          }
        }
      }
    },
    orderBy: { start_date: 'desc' }
  })

  return experiences;
};