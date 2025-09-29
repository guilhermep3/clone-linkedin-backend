import { Router } from "express";
import * as postController from "../controllers/post.js";
import { verifyJWT } from "../utils/jwt.js";
import { userMiddleware } from "../utils/userMiddleware.js";
export const postRoutes = Router();
postRoutes.get('/', verifyJWT, postController.getPosts);
postRoutes.get('/:id', verifyJWT, postController.getPost);
postRoutes.get('/:id/commentaries', verifyJWT, postController.getCommentaries);
postRoutes.post('/', verifyJWT, userMiddleware, postController.addPost);
postRoutes.post('/:id/commentaries', verifyJWT, userMiddleware, postController.addCommentary);
postRoutes.post('/:id/like', verifyJWT, userMiddleware, postController.likeToggle);
postRoutes.post('/:id/share', verifyJWT, userMiddleware, postController.shareToggle);
postRoutes.put('/:id', verifyJWT, userMiddleware, postController.updatePost);
postRoutes.delete('/:id', verifyJWT, userMiddleware, postController.deletePost);
postRoutes.delete('/:id/commentaries/:idcomment', userMiddleware, verifyJWT, postController.deleteCommentary);
//# sourceMappingURL=postRoutes.js.map