import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { findUserByUsername } from "../services/user.js";
import { findCompanyByUsername } from "../services/company.js";

export const createJWT = (username: string, accountType: 'user' | 'company') => {
  return jwt.sign({ username, accountType }, process.env.JWT_SECRET as string)
}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  // verificar authorization
  // pegar token
  // usar funcao jwt.verify
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).json({ error: 'Acesso negado 1' });
    return;
  }

  const token = authorization.split(' ')[1];

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    async (error, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'Acesso negado 2', details: error });
        return;
      }

      const { username, accountType } = decoded;

      let account = null;
      if (accountType === 'user') {
        account = await findUserByUsername(username);
      } else if (accountType === 'company') {
        account = await findCompanyByUsername(username);
      }

      if (!account) {
        res.status(401).json({ error: 'Acesso negado 3' });
        return;
      }

      req.usernameLogged = username;
      req.accountType = accountType;
      next();
    }
  )
}