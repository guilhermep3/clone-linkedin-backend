import { Router } from "express";
import * as vacancieController from "../controllers/vacancie.js";
import { verifyJWT } from "../utils/jwt.js";
import { userMiddleware } from "../utils/userMiddleware.js";
export const vacancieRoutes = Router();
vacancieRoutes.get('/', verifyJWT, vacancieController.getVacancies);
vacancieRoutes.get('/:id', verifyJWT, vacancieController.getVacancie);
vacancieRoutes.post('/', verifyJWT, userMiddleware, vacancieController.addVacancie);
vacancieRoutes.put('/:id', verifyJWT, vacancieController.updateVacancie);
vacancieRoutes.delete('/:id', verifyJWT, vacancieController.deleteVacancie);
//# sourceMappingURL=vacanciesRoutes.js.map