import { Router } from "express";
// import * as postController from "../controllers/post.js";
import { verifyJWT } from "../utils/jwt.js";

export const postRoutes = Router();

// postRoutes.get('/', verifyJWT, postController.getPosts);
// postRoutes.get('/:id', verifyJWT, postController.getPost);
// postRoutes.get('/:id/commentaries', verifyJWT, postController.getCommentaries);
// postRoutes.post('/', verifyJWT, postController.addPost);
// postRoutes.post('/:id/commentaries', verifyJWT, postController.addCommentary);
// postRoutes.post('/:id/like', verifyJWT, postController.likeToggle);
// postRoutes.post('/:id/share', verifyJWT, postController.shareToggle);
// postRoutes.delete('/:id', verifyJWT, postController.deletePost);