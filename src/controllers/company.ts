import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { companySchema, updateCompanySchema } from "../schema/company.js";
import { createCompany, deleteCompanyById, findCompanies, findCompanyByEmail, findCompanyById, findCompanyByUsername, findEmployees, getCompanyFollowersCount, getCompanyFollowingCount, getCompanyPostsCount, getEmployeesCount, updateCompanyById } from "../services/company.js";
import { hash } from "bcrypt-ts";
import type { Prisma } from "@prisma/client";
import slug from "slug";
import { pageSchema } from "../schema/pageSchema.js";

export const addCompany = async (req: ExtendedRequest, res: Response) => {
  const safeData = companySchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const hasEmail = await findCompanyByEmail(safeData.data.email);
  if (hasEmail) {
    res.json({ error: 'Email já existe' });
    return;
  }

  const hasUsername = await findCompanyByUsername(safeData.data.username);
  if (hasUsername) {
    res.status(400).json({ error: 'Username já existe' });
    return;
  }

  let generateSlug = true;
  let username = safeData.data.username;
  while (generateSlug) {
    const hasSlug = await findCompanyByUsername(username);
    if (hasSlug) {
      const slugSuffix = Math.floor(Math.random() * 999999).toString();
      username = slug(username, slugSuffix);
    } else {
      generateSlug = false;
    }
  }

  const hashPassword = await hash(safeData.data.password, 10);

  const companyData = {
    ...safeData.data,
    password: hashPassword
  }

  const newCompany = await createCompany(companyData as unknown as Prisma.companiesCreateInput);

  res.json({ newCompany });
}

export const getCompany = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const company = await findCompanyById(id);
  if (!company) {
    res.status(400).json({ error: '' });
    return;
  }

  const followingCount = await getCompanyFollowingCount(company.id);
  const followersCount = await getCompanyFollowersCount(company.id);
  const postsCount = await getCompanyPostsCount(company.id);
  const employeesCount = await getEmployeesCount(company.id);

  res.json({ company, followingCount, followersCount, postsCount, employeesCount });
}

export const getCompanies = async (req: ExtendedRequest, res: Response) => {
  const safeData = pageSchema.safeParse(req.query);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors })
    return;
  }

  let perPage = 10;
  let currentPage = safeData.data.page ?? 0;

  const companies = await findCompanies(perPage, currentPage);

  res.json({ companies });
}

export const getCompanyEmployees = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const company = await findCompanyById(id);
  if (!company) {
    res.status(400).json({ error: 'Empresa não encontrada' });
    return;
  }

  const employees = await findEmployees(id);

  res.json({ employees });
}

export const updateCompany = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const safeData = updateCompanySchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const company = await findCompanyById(id);
  if (!company) {
    res.status(400).json({ error: 'Empresa não encontrada' });
    return;
  }

  const companyUpdated = await updateCompanyById(id, safeData.data as unknown as Prisma.companiesUpdateInput);

  res.json({ companyUpdated });
}

export const deleteCompany = async (req: ExtendedRequest, res: Response) => {
  const id = parseInt(req.params.id as string);

  const company = await findCompanyById(id);
  if (!company) {
    res.status(400).json({ error: 'Empresa não encontrada' });
    return;
  }

  await deleteCompanyById(id);

  res.json({ deleted: true });
}
