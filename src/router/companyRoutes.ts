import { Router } from "express";
import * as companyController from "../controllers/company.js";
import { verifyJWT } from "../utils/jwt.js";
import { userMiddleware } from "../utils/userMiddleware.js";

export const companyRoutes = Router();

companyRoutes.get('/', verifyJWT, companyController.getCompanies);
companyRoutes.get('/:id', verifyJWT, userMiddleware, companyController.getCompany);
companyRoutes.get('/:id/employees', verifyJWT, userMiddleware, companyController.getCompanyEmployees);
companyRoutes.post('/', companyController.addCompany);
companyRoutes.put('/:id', verifyJWT, companyController.updateCompany);
companyRoutes.delete('/:id', verifyJWT, companyController.deleteCompany);