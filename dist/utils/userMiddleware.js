import { findUserByUsername } from "../services/user.js";
export const userMiddleware = async (req, res, next) => {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
    }
    req.userFound = user;
    next();
};
//# sourceMappingURL=userMiddleware.js.map