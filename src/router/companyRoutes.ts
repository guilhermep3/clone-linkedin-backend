import { Router } from "express";
// import * as companyController from "../controllers/company.js";
import { verifyJWT } from "../utils/jwt.js";

export const companyRoutes = Router();

// companyRoutes.post('/', verifyJWT, companyController.createCompany);
// companyRoutes.get('/', verifyJWT, companyController.getCompanies);
// companyRoutes.get('/:id', verifyJWT, companyController.getCompany);
// companyRoutes.put('/:id', verifyJWT, companyController.updateCompany);
// companyRoutes.delete('/:id', verifyJWT, companyController.deleteCompany);