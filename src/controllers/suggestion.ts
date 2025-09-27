import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
import { getUserSuggestions } from "../services/user.js";

export const getSuggestions = async (req: ExtendedRequest, res: Response) => {
  const suggestions = await getUserSuggestions(req.userFound.id as number)

  res.json({ users: suggestions });
}