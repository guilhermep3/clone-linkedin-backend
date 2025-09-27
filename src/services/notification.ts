import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export const createNotification = async (data: Prisma.notificationsCreateInput) => {
  await prisma.notifications.create({
    data: {
      user_id: data.user_id,
      actor_id: data.actor_id ?? null,
      actor_type: data.actor_type,
      type: data.type,
      entity_id: data.entity_id ?? null,
      entity_type: data.entity_type,
      message: data.message,
    }
  })
}

export const findNotifications = async (user_id: number, perPage: number, currentPage: number) => {
  const notifications = await prisma.notifications.findMany({
    where: { user_id },
    skip: currentPage * perPage,
    take: perPage,
    orderBy: { created_at: "desc" }
  });

  return notifications;
};
