import type { Prisma } from "@prisma/client";
export declare const createNotification: (data: Prisma.notificationsCreateInput) => Promise<void>;
export declare const findNotifications: (user_id: number, perPage: number, currentPage: number) => Promise<{
    type: import("@prisma/client").$Enums.notifications_type;
    message: string;
    id: number;
    user_id: number;
    created_at: Date;
    actor_id: number | null;
    actor_type: import("@prisma/client").$Enums.owner_type;
    entity_id: number | null;
    entity_type: import("@prisma/client").$Enums.notification_entity_type;
    read: boolean;
}[]>;
//# sourceMappingURL=notification.d.ts.map