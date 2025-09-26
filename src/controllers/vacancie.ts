import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { updateVacancieSchema, vacancieSchema } from "../schema/vacancie.js";
import { createVacancie, deleteVacancieById, findVacancieById, findVacancies, updateVacancieById } from "../services/vacancie.js";
import { pageSchema } from "../schema/userPosts.js";
import type { Prisma } from "@prisma/client";

export const getVacancies = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;
  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const vacancie = await findVacancies(user.id, perPage, currentPage);

  res.json({ vacancie });
}

export const getVacancie = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const post = await findVacancieById(id);
  if (!post) {
    res.status(404).json({ error: 'Postagem não encontrada' });
    return;
  }

  res.json({ post });
}

export const addVacancie = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const safeData = vacancieSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const newVacancie = await createVacancie(safeData.data as Prisma.vacanciesCreateInput, user.id);

  res.json({ newVacancie });
}

export const updateVacancie = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateVacancieSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const vacancieUpdated = await updateVacancieById(safeData.data as Prisma.vacanciesUpdateInput, id);

  res.json({ vacancieUpdated });
}

export const deleteVacancie = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteVacancieById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar vaga', errorDetails: error })
  }
}