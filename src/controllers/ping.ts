import type { Request, Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true });
}

export const privateping = (req: ExtendedRequest, res: Response) => {
  res.json({ pong: true, userSlug: req.username });
}