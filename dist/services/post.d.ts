export declare const findPostsByUser: (id: number, currentPage: number, perPage: number) => Promise<({
    post_likes: {
        owner_id: number;
        post_id: number;
    }[];
} & {
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
})[]>;
export declare const findPostsFeed: (following: number[], currentPage: number, perPage: number) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
}[]>;
export declare const findPostByBody: (q: string, currentPage: number, perPage: number) => Promise<{
    id: number;
    created_at: Date;
    owner_id: number;
    owner_type: import("@prisma/client").$Enums.owner_type;
    content: string | null;
    visible: boolean;
}[]>;
//# sourceMappingURL=post.d.ts.map