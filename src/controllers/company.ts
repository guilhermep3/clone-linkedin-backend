import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { companySchema } from "../schema/company.js";
import { createCompany, findCompanyByEmail, findCompanyByUsername } from "../services/company.js";
import { hash } from "bcrypt-ts";
import type { Prisma } from "@prisma/client";
import slug from "slug";

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

  const newCompany = await createCompany(companyData as Prisma.companiesCreateInput);

  res.json({ newCompany });
}