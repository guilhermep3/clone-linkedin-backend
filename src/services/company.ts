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

export const findCompanies = async (perPage: number, currentPage: number) => {
  const companies = await prisma.companies.findMany({
    skip: currentPage * perPage,
    take: perPage
  })

  return companies;
}

export const getCompanyFollowingCount = async (id: number) => {
  const followingCount = await prisma.following.count({
    where: { follower_id: id, follower_type: 'company' }
  })

  return followingCount;
}

export const getCompanyFollowersCount = async (id: number) => {
  const followersCount = await prisma.following.count({
    where: { following_id: id, following_type: 'company' }
  })

  return followersCount;
}

export const getCompanyPostsCount = async (id: number) => {
  const followersCount = await prisma.posts.count({
    where: { owner_id: id, owner_type: 'company' }
  })

  return followersCount;
}

export const getEmployeesCount = async (id: number) => {
  const employeesCount = await prisma.company_employees.count({
    where: { company_id: id }
  })

  return employeesCount;
}

export const findEmployees = async (company_id: number) => {
  const employees = await prisma.company_employees.findMany({
    where: { company_id }
  })

  return employees;
}

export const addEmployed = async (company_id: number, user_id: number, role: string) => {
  const newEmployed = await prisma.company_employees.create({
    data: { company_id, user_id, role, employment_type: 'Full_time' }
  })

  return newEmployed;
}

export const updateCompanyById = async (id: number, data: Prisma.companiesUpdateInput) => {
  const companyUpdated = await prisma.companies.update({
    where: { id },
    data
  })

  return companyUpdated;
}

export const deleteCompanyById = async (id: number) => {
  await prisma.companies.delete({
    where: { id }
  })
}