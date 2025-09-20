import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { findUserByUsername } from "../services/user.js";

export const createJWT = (username: string) => {
  return jwt.sign({ username }, process.env.JWT_SECRET as string)
}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  // verificar authorization
  // pegar token
  // usar funcao jwt.verify
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).json({ error: 'Acesso negado' });
    return;
  }

  const token = authorization.split(' ')[1];

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    async (error, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'Acesso negado' });
        return;
      }

      const user = await findUserByUsername(decoded.username);
      if(!user){
        res.status(401).json({ error: 'Acesso negado 3' });
        return;
      }

      req.userLogged = decoded.username;
      next();
    }
  )
}