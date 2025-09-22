import { Router } from "express";
// import * as vacancieController from "../controllers/vacancie.js";
import { verifyJWT } from "../utils/jwt.js";

export const vacancieRoutes = Router();

// vacancieRoutes.post('/', verifyJWT, vacancieController.addVacancie);
// vacancieRoutes.get('/', verifyJWT, vacancieController.getVacancie);
// vacancieRoutes.get('/:id', verifyJWT, vacancieController.getVacancie);
// vacancieRoutes.put('/:id', verifyJWT, vacancieController.updateVacancie);
// vacancieRoutes.delete('/:id', verifyJWT, vacancieController.deleteVacancie);