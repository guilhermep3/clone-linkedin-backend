import type { Prisma } from "@prisma/client";
import type { ownerType } from "../type/extendedRequest.js";
export declare const findPosts: (perPage: number, currentPage: number) => Promise<({
    post_comments: {
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        content: string;
    }[];
    post_likes: {
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
    }[];
    post_media: {
        id: number;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        media_url: string;
        media_type: import("@prisma/client").$Enums.post_media_media_type;
    }[];
    post_shares: {
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
    }[];
} & {
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
})[]>;
export declare const findPostById: (id: number) => Promise<{
    post_media: {
        owner: {
            name: string;
            id: number;
            avatar: string;
        } | null;
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        post_id: number;
        media_url: string;
        media_type: import("@prisma/client").$Enums.post_media_media_type;
    }[];
    post_likes: {
        owner: {
            name: string;
            id: number;
            avatar: string;
        } | null;
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        post_id: number;
    }[];
    post_shares: {
        owner: {
            name: string;
            id: number;
            avatar: string;
        } | null;
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        post_id: number;
    }[];
    post_comments: {
        owner: {
            name: string;
            id: number;
            avatar: string;
        } | null;
        id: number;
        created_at: Date;
        owner_id: number;
        owner_type: import("@prisma/client").$Enums.owner_type;
        content: string;
        post_id: number;
    }[];
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
} | null>;
export declare const findPostCommentaries: (id: number) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string;
    post_id: number;
}[]>;
export declare const createPost: (data: Prisma.postsCreateInput, owner_id: number, owner_type: ownerType) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
}>;
export declare const createCommentary: (content: string, post_id: number, owner_id: number, owner_type: ownerType) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string;
    post_id: number;
}>;
export declare const checkIfIsLiked: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<boolean>;
export declare const like: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    post_id: number;
}>;
export declare const unlike: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<Prisma.BatchPayload>;
export declare const checkIfIsShared: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<boolean>;
export declare const share: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    post_id: number;
}>;
export declare const unshare: (post_id: number, owner_id: number, owner_type: ownerType) => Promise<Prisma.BatchPayload>;
export declare const updatePostById: (data: Prisma.postsUpdateInput, id: number) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
}>;
export declare const checkIfIsUserPost: (id: number, owner_id: number, owner_type: ownerType) => Promise<boolean>;
export declare const checkIfIsUserCommentary: (id: number, owner_id: number, owner_type: ownerType) => Promise<boolean>;
export declare const deletePostById: (id: number) => Promise<void>;
export declare const deleteCommentaryById: (id: number) => Promise<void>;
//# sourceMappingURL=posts.d.ts.map