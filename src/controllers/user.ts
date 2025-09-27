import type { Response } from "express";
import {
  findUserByUsername, findUserSkills, findUserExperiences, getUserFollowersCount,
  getUserFollowingCount, getUserPostsCount, findUserEducations, checkIfFollows,
  follow, unfollow, findUserCertificates, createExperience,
  createSkills, findExperienceById, findUserSkillById, createExperienceSkill,
  createEducation, createCertificate, findUsers, updateUserByUsername,
  updateExperienceById,
  updateUserSkillsById,
  updateEducationById,
  deleteUserById,
  deleteUserSkillById,
  deleteExperienceById,
  deleteExperienceSkillById,
  deleteEducationById,
  deleteCertificateById,
  updateCertificateById
} from "../services/user.js";
import type { ExtendedRequest, ownerType } from "../type/extendedRequest.js";
import { pageSchema } from "../schema/userPosts.js";
import { findPostsByUser } from "../services/post.js";
import { experienceSchema, experienceSkillSchema, updateExperienceSchema } from "../schema/experience.js";
import type { Prisma } from "@prisma/client";
import { addEmployed, findCompanyById } from "../services/company.js";
import { updateUserSkillSchema, userSkillSchema } from "../schema/userSkill.js";
import { educationSchema, updateEducationSchema } from "../schema/education.js";
import { certificateSchema, updateCertificateSchema } from "../schema/certificate.js";
import { updateUserSchema } from "../schema/updateUser.js";
import { createJWT } from "../utils/jwt.js";
import { createNotification } from "../services/notification.js";

export const getUsers = async (req: ExtendedRequest, res: Response) => {
  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    return;
  }
  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const users = await findUsers(perPage, currentPage);

  res.json({ users, page: currentPage });
}

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const followingCount = await getUserFollowingCount(user.id);
  const followersCount = await getUserFollowersCount(user.id);
  const postsCount = await getUserPostsCount(user.id);

  res.json({ user, followingCount, followersCount, postsCount });
}

export const getUserPosts = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors })
    return;
  }

  let currentPage = safeData.data.page ?? 0;
  let perPage = 10;

  const posts = await findPostsByUser(user.id, currentPage, perPage);
  if (!posts) {
    res.status(400).json({ error: 'Usuário não tem nenhuma postagem' });
    return;
  }

  res.json({ posts, page: currentPage });
}

export const getUserExperiences = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const experiences = await findUserExperiences(user.id);

  res.json({ experiences });
}

export const getUserSkills = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const skills = await findUserSkills(user.id);

  res.json({ skills });
}

export const getUserEducations = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const educations = await findUserEducations(user.id);

  res.json({ educations });
}

export const getUserCertificates = async (req: ExtendedRequest, res: Response) => {
  const user = req.userFound;

  const certificates = await findUserCertificates(user.id);

  res.json({ certificates });
}

export const followToggle = async (req: ExtendedRequest, res: Response) => {
  const usernameLogged = req.usernameLogged as string;
  const usernameToBeFollowed = req.params.username as string;

  const user = await findUserByUsername(usernameLogged);
  if (!user) {
    res.status(400).json({ error: 'Usuário não encontrado' });
    return;
  }

  const username = await findUserByUsername(usernameToBeFollowed);
  if (!username) {
    res.status(400).json({ error: 'Usuário não encontrado' });
    return;
  }

  const follows = await checkIfFollows(user.id, username.id);

  await createNotification({
    user_id: username.id,
    actor_id: user.id as number,
    actor_type: req.accountType as ownerType,
    type: "Follow",
    entity_id: username.id,
    entity_type: "User",
    message: "seguiu você"
  });

  if (!follows) {
    await follow(user.id, username.id);
    res.json({ following: true });
  } else {
    await unfollow(user.id, username.id);
    res.json({ following: false });
  }
}

export const addSkills = async (req: ExtendedRequest, res: Response) => {
  const safeData = userSkillSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByUsername(req.usernameLogged as string);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  const newSkills = await createSkills(
    safeData.data.name, safeData.data.level, user.id
  );

  res.json({ newSkills });
}


export const addExperience = async (req: ExtendedRequest, res: Response) => {
  const safeData = experienceSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByUsername(req.usernameLogged as string);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  const company = await findCompanyById(safeData.data.company_id);
  if (!company) {
    res.status(404).json({ error: 'Empresa não encontrada' });
    return;
  }

  if (safeData.data.current) {
    await addEmployed(company.id, user.id, safeData.data.role);
  }

  const experienceData = {
    ...safeData.data,
    user_id: user.id
  }

  const newExperience = await createExperience(experienceData as unknown as Prisma.experiencesCreateInput);

  res.json({ newExperience });
}

export const addExperienceSkill = async (req: ExtendedRequest, res: Response) => {
  const safeData = experienceSkillSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const hasExperience = await findExperienceById(safeData.data.experience_id);
  if (!hasExperience) {
    res.status(404).json({ error: 'Experiência não encontrada' });
    return;
  }

  const hasUserSkill = await findUserSkillById(safeData.data.user_skill_id);
  if (!hasUserSkill) {
    res.status(404).json({ error: 'Competência não encontrada' });
    return;
  }

  const newExperienceSkill = await createExperienceSkill(
    safeData.data.experience_id,
    safeData.data.user_skill_id
  );

  res.json({ newExperienceSkill });
}

export const addEducation = async (req: ExtendedRequest, res: Response) => {
  const safeData = educationSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByUsername(req.usernameLogged as string);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  const educationData = {
    ...safeData.data,
    user_id: user.id
  }

  const newEducation = await createEducation(educationData as unknown as Prisma.educationsCreateInput);

  res.json({ newEducation });
}

export const addCertificate = async (req: ExtendedRequest, res: Response) => {
  const safeData = certificateSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByUsername(req.usernameLogged as string);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado' });
    return;
  }

  const certificateData = {
    ...safeData.data,
    user_id: user.id
  }

  const newCertificate = await createCertificate(certificateData as unknown as Prisma.certificatesCreateInput);

  res.json({ newCertificate });
}

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  const safeData = updateUserSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  // se atualizar o username, cria um novo jwt
  if (req.body.username && req.body.username !== req.usernameLogged) {
    const newToken = createJWT(req.body.username, req.accountType! as 'user' | 'company');
    return res.json({ message: "Username atualizado", token: newToken });
  }

  const userUpdated = await updateUserByUsername(
    safeData.data as Prisma.usersUpdateInput,
    req.usernameLogged as string
  );

  res.json({ userUpdated })
}

export const updateExperience = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateExperienceSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const experienceUpdated = await updateExperienceById(
    safeData.data as Prisma.experiencesUpdateInput, id as number
  )

  res.json({ experienceUpdated })
}

export const updateUserSkills = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateUserSkillSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const userSkillsUpdated = await updateUserSkillsById(
    safeData.data as Prisma.user_skillsUpdateInput, id
  )

  res.json({ userSkillsUpdated })
}

export const updateEducation = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateEducationSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const educationUpdated = await updateEducationById(
    safeData.data as Prisma.educationsUpdateInput, id
  )

  res.json({ educationUpdated })
}

export const updateCertificate = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateCertificateSchema.safeParse(req.body);
  if (!safeData.success) {
    res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const certificateUpdated = await updateCertificateById(
    safeData.data as Prisma.certificatesUpdateInput, id
  )

  res.json({ certificateUpdated })
}

export const deleteUser = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteUserById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', errorDetails: error })
  }
}

export const deleteUserSkills = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteUserSkillById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar competência de usuário', errorDetails: error })
  }
}

export const deleteExperience = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteExperienceById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar experiência', errorDetails: error })
  }
}

export const deleteExperienceSkill = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteExperienceSkillById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar competência de experiência', errorDetails: error })
  }
}

export const deleteEducation = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteEducationById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar educação', errorDetails: error })
  }
}

export const deleteCertificate = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  try {
    await deleteCertificateById(id);

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar certificado', errorDetails: error })
  }
}