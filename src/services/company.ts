import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js"

export const findCompanyById = async (id: number) => {
  const company = await prisma.companies.findFirst({
    where: { id }
  })

  return company;
}

export const findCompanyByUsername = async (username: string) => {
  const company = await prisma.companies.findFirst({
    where: { username }
  })

  return company;
}

export const findCompanyByEmail = async (email: string) => {
  const company = await prisma.companies.findFirst({
    where: { email }
  })

  return company;
}

export const createCompany = async (data: Prisma.companiesCreateInput) => {
  const newCompany = await prisma.companies.create({
    data
  })

  return newCompany;
}