import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
export declare const addCompany: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const getCompany: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const getCompanies: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const getCompanyEmployees: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const updateCompany: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const deleteCompany: (req: ExtendedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=company.d.ts.map