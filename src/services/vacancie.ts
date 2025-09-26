import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js"

export const findVacancies = async (id: number, perPage: number, currentPage: number) => {
  const vacancie = await prisma.vacancies.findMany({
    skip: currentPage * perPage,
    take: perPage
  })

  return vacancie;
}

export const findVacancieById = async (id: number) => {
  const vacancie = await prisma.vacancies.findFirst({
    where: { id }
  })

  return vacancie;
}

export const createVacancie = async (data: Prisma.vacanciesCreateInput, id: number) => {
  const newVacancie = await prisma.vacancies.create({
    data
  })

  return newVacancie;
}

export const updateVacancieById = async (data: Prisma.vacanciesUpdateInput, id: number) => {
  const vacancieUpdated = await prisma.vacancies.update({
    data,
    where: { id }
  })

  return vacancieUpdated;
}

export const deleteVacancieById = async (id: number) => {
  await prisma.vacancies.delete({
    where: { id }
  })
}