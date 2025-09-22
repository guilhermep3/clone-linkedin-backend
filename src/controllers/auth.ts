import type { Response } from "express";
import { signinSchema, signupSchema } from "../schema/auth.js"
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { createUser, findUserByEmail, findUserByUsername } from "../services/user.js";
import { findCompanyByEmail } from "../services/company.js"
import slug from "slug";
import { compare, hash } from "bcrypt-ts";
import { Prisma } from "@prisma/client";
import { createJWT } from "../utils/jwt.js";

export const signup = async (req: ExtendedRequest, res: Response) => {
  const safeData = signupSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const hasEmail = await findUserByEmail(safeData.data.email);
  if (hasEmail) {
    res.json({ error: 'Email já existe' });
    return;
  }

  let generateSlug = true;
  let username = safeData.data.username;
  while (generateSlug) {
    const hasSlug = await findUserByUsername(username);
    if (hasSlug) {
      const slugSuffix = Math.floor(Math.random() * 999999).toString();
      username = slug(safeData.data.username + slugSuffix);
    } else {
      generateSlug = false;
    }
  }

  const hashPassword = await hash(safeData.data.password, 10);

  const userData = {
    ...safeData.data,
    username,
    password: hashPassword
  }

  const newUser = await createUser(userData as Prisma.usersCreateInput);

  res.json({ user: newUser });
}

export const signin = async (req: ExtendedRequest, res: Response) => {
  const safeData = signinSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  let account: any = await findUserByEmail(safeData.data.email);
  let accountType: 'user' | 'company' = 'user';

  if (!account) {
    account = await findCompanyByEmail(safeData.data.email);
    accountType = 'company';
  }

  if (!account) {
    res.status(400).json({ error: 'Acesso negado' });
    return;
  }

  const verifyPass = await compare(safeData.data.password, account.password);
  if (!verifyPass) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  const token = await createJWT(account.username, accountType);

  res.json({
    token,
    user: {
      username: account.username,
      avatar: account.avatar
    }
  });
}