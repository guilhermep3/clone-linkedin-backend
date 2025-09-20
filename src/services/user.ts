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