import { pageSchema } from "../schema/pageSchema.js";
import { findNotifications } from "../services/notification.js";
export const getNotifications = async (req, res) => {
    const user = req.userFound;
    const safeData = pageSchema.safeParse(req.query);
    if (!safeData.success) {
        return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }
    const perPage = 10;
    const currentPage = safeData.data.page ?? 0;
    try {
        const notifications = await findNotifications(user.id, perPage, currentPage);
        res.json({ notifications });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar notificações", errorDetails: error });
    }
};
//# sourceMappingURL=notification.js.map