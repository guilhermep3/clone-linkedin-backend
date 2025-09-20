import { Router } from "express";
import * as pingController from "../controllers/ping.js";
import * as authController from "../controllers/auth.js";
// import * as userController from "../controllers/user.js";
// import * as postController from "../controllers/post.js";
// import * as companyController from "../controllers/company.js";
// import * as vacanciesController from "../controllers/vacancies.js";
// import * as notificationsController from "../controllers/notifications.js";
// import * as feedController from "../controllers/feed.js";
// import * as searchController from "../controllers/search.js";
// import * as trendController from "../controllers/trend.js";
// import * as suggestionsController from "../controllers/suggestions.js";
import { verifyJWT } from "../utils/jwt.js";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/privateping', verifyJWT, pingController.privateping);

mainRouter.post('/auth/signup', authController.signup);
mainRouter.post('/auth/signin', authController.signin);

// mainRouter.get('/user', verifyJWT, userController.getUser);
// mainRouter.get('/user/:slug/post', verifyJWT, userController.getUserPosts);
// mainRouter.get('/user/:slug/experience', verifyJWT, userController.getUserExperiences);
// mainRouter.get('/user/:slug/competence', verifyJWT, userController.getUserCompetences);
// mainRouter.get('/user/:slug/certificate', verifyJWT, userController.getUserCertificates);
// mainRouter.get('/user/:slug/formation', verifyJWT, userController.getUserFormations);
// mainRouter.post('/user/:slug/follow', verifyJWT, userController.followToggle);
// mainRouter.post('/user/:slug/experience', verifyJWT, userController.createExperience);
// mainRouter.post('/user/:slug/competence', verifyJWT, userController.createCompetence);
// mainRouter.post('/user/:slug/certificate', verifyJWT, userController.createCertificate);
// mainRouter.post('/user/:slug/formation', verifyJWT, userController.createFormation);
// mainRouter.put('/user', verifyJWT, userController.updateUser);
// mainRouter.put('/user/avatar', verifyJWT, userController.updateAvatar);
// mainRouter.put('/user/cover', verifyJWT, userController.updateCover);
// mainRouter.put('/user/:slug/experience/:id', verifyJWT, userController.updateExperience);
// mainRouter.put('/user/:slug/competence/:id', verifyJWT, userController.updateCompetence);
// mainRouter.put('/user/:slug/certificate/:id', verifyJWT, userController.updateCertificate);
// mainRouter.put('/user/:slug/formation/:id', verifyJWT, userController.updateFormation);
// mainRouter.delete('/user', verifyJWT, userController.deleteUser);
// mainRouter.delete('/user/:slug/experience/:id', verifyJWT, userController.deleteExperience);
// mainRouter.delete('/user/:slug/competence/:id', verifyJWT, userController.deleteCompetence);
// mainRouter.delete('/user/:slug/certificate/:id', verifyJWT, userController.deleteCertificate);
// mainRouter.delete('/user/:slug/formation/:id', verifyJWT, userController.deleteFormation);

// mainRouter.post('/post', verifyJWT, postController.createPost);
// mainRouter.get('/post', verifyJWT, postController.getPosts);
// mainRouter.get('/post/:id', verifyJWT, postController.getPost);
// mainRouter.get('/post/:id/commentaries', verifyJWT, postController.getCommentaries);
// mainRouter.post('/post/:id/commentaries', verifyJWT, postController.createCommentary);
// mainRouter.post('/post/:id/like', verifyJWT, postController.likeToggle);
// mainRouter.post('/post/:id/share', verifyJWT, postController.shareToggle);
// mainRouter.delete('/post/:id', verifyJWT, postController.deletePost);

// mainRouter.post('/company', verifyJWT, companyController.createCompany);
// mainRouter.get('/company', verifyJWT, companyController.getCompanies);
// mainRouter.get('/company/:id', verifyJWT, companyController.getCompany);
// mainRouter.put('/company/:id', verifyJWT, companyController.updateCompany);
// mainRouter.delete('/company/:id', verifyJWT, companyController.deleteCompany);

// mainRouter.post('/vacancies', verifyJWT, vacanciesController.createVacancie);
// mainRouter.get('/vacancies', verifyJWT, vacanciesController.getVacancie);
// mainRouter.get('/vacancies/:id', verifyJWT, vacanciesController.getVacancie);
// mainRouter.put('/vacancies/:id', verifyJWT, vacanciesController.updateVacancie);
// mainRouter.delete('/vacancies/:id', verifyJWT, vacanciesController.deleteVacancie);

// mainRouter.get('/notifications', verifyJWT, notificationsController.getNotifications);
// mainRouter.get('/feed', verifyJWT, feedController.getFeed);
// mainRouter.get('/search', verifyJWT, searchController.searchTweets);
// mainRouter.get('/trending', verifyJWT, trendController.getTrends);
// mainRouter.get('/suggestions', verifyJWT, suggestionsController.getSuggestions);