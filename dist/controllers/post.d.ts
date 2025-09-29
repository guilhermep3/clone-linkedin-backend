import type { Response } from "express";
import type { ExtendedRequest } from "../type/extendedRequest.js";
export declare const getPosts: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const getPost: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const getCommentaries: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const addPost: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const addCommentary: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const likeToggle: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const shareToggle: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const updatePost: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const deletePost: (req: ExtendedRequest, res: Response) => Promise<void>;
export declare const deleteCommentary: (req: ExtendedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=post.d.ts.map