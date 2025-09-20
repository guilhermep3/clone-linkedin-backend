import { Router } from "express";
import * as userController from "../controllers/user.js";
import { verifyJWT } from "../utils/jwt.js";

export const userRoutes = Router();

userRoutes.get('/:username', verifyJWT, userController.getUser);
userRoutes.get('/:username/post', verifyJWT, userController.getUserPosts);
// userRoutes.get('/:username/experience', verifyJWT, userController.getUserExperiences);
// userRoutes.get('/:username/competence', verifyJWT, userController.getUserCompetences);
// userRoutes.get('/:username/certificate', verifyJWT, userController.getUserCertificates);
// userRoutes.get('/:username/formation', verifyJWT, userController.getUserFormations);
// userRoutes.post('/:username/follow', verifyJWT, userController.followToggle);
// userRoutes.post('/:username/experience', verifyJWT, userController.createExperience);
// userRoutes.post('/:username/competence', verifyJWT, userController.createCompetence);
// userRoutes.post('/:username/certificate', verifyJWT, userController.createCertificate);
// userRoutes.post('/:username/formation', verifyJWT, userController.createFormation);
// userRoutes.put('', verifyJWT, userController.updateUser);
// userRoutes.put('/avatar', verifyJWT, userController.updateAvatar);
// userRoutes.put('/cover', verifyJWT, userController.updateCover);
// userRoutes.put('/:username/experience/:id', verifyJWT, userController.updateExperience);
// userRoutes.put('/:username/competence/:id', verifyJWT, userController.updateCompetence);
// userRoutes.put('/:username/certificate/:id', verifyJWT, userController.updateCertificate);
// userRoutes.put('/:username/formation/:id', verifyJWT, userController.updateFormation);
// userRoutes.delete('', verifyJWT, userController.deleteUser);
// userRoutes.delete('/:username/experience/:id', verifyJWT, userController.deleteExperience);
// userRoutes.delete('/:username/competence/:id', verifyJWT, userController.deleteCompetence);
// userRoutes.delete('/:username/certificate/:id', verifyJWT, userController.deleteCertificate);
// userRoutes.delete('/:username/formation/:id', verifyJWT, userController.deleteFormation);