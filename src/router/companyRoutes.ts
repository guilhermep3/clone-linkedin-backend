import { Router } from "express";
import * as companyController from "../controllers/company.js";
import { verifyJWT } from "../utils/jwt.js";

export const companyRoutes = Router();

// companyRoutes.get('/', verifyJWT, companyController.getCompanies);
// companyRoutes.get('/:id', verifyJWT, companyController.getCompany);
// companyRoutes.get('/:id/employees', verifyJWT, companyController.getCompanyEmployees);
companyRoutes.post('/', companyController.addCompany);
// companyRoutes.put('/:id', verifyJWT, companyController.updateCompany);
// companyRoutes.delete('/:id', verifyJWT, companyController.deleteCompany);