import { Router } from "express";
import * as pingController from "../controllers/ping.js";
// import * as notificationController from "../controllers/notification.js";
// import * as feedController from "../controllers/feed.js";
// import * as searchController from "../controllers/search.js";
// import * as trendController from "../controllers/trend.js";
// import * as suggestionController from "../controllers/suggestion.js";
import { verifyJWT } from "../utils/jwt.js";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { postRoutes } from "./postRoutes.js";
import { companyRoutes } from "./companyRoutes.js";
import { vacancieRoutes } from "./vacanciesRoutes.js";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/privateping', verifyJWT, pingController.privateping);

mainRouter.use('/auth', authRoutes);
mainRouter.use('/users', userRoutes);
mainRouter.use('/posts', postRoutes);
mainRouter.use('/companies', companyRoutes);
mainRouter.use('/vacancies', vacancieRoutes);

// mainRouter.get('/notifications', verifyJWT, notificationController.getNotifications);
// mainRouter.get('/feed', verifyJWT, feedController.getFeed);
// mainRouter.get('/search', verifyJWT, searchController.searchPosts);
// mainRouter.get('/trendings', verifyJWT, trendController.getTrends);
// mainRouter.get('/suggestion', verifyJWT, suggestionController.getSuggestions);