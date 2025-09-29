import type { NextFunction, Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
export declare const createJWT: (username: string, accountType: "user" | "company") => string;
export declare const verifyJWT: (req: ExtendedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=jwt.d.ts.map