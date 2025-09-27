import type { NextFunction, Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { findUserByUsername } from "../services/user.js";

export const userMiddleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const username = req.params.username as string;

  const user = await findUserByUsername(username);
  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  req.userFound = user;
  
  next();
}