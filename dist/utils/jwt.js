import jwt from "jsonwebtoken";
import { findUserByUsername } from "../services/user.js";
import { findCompanyByUsername } from "../services/company.js";
export const createJWT = (username, accountType) => {
    return jwt.sign({ username, accountType }, process.env.JWT_SECRET);
};
export const verifyJWT = (req, res, next) => {
    // verificar authorization
    // pegar token
    // usar funcao jwt.verify
    const authorization = req.headers['authorization'];
    if (!authorization) {
        res.status(401).json({ error: 'Acesso negado 1' });
        return;
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) {
            res.status(401).json({ error: 'Acesso negado 2', details: error });
            return;
        }
        const { username, accountType } = decoded;
        let account = null;
        if (accountType === 'user') {
            account = await findUserByUsername(username);
        }
        else if (accountType === 'company') {
            account = await findCompanyByUsername(username);
        }
        if (!account) {
            res.status(401).json({ error: 'Acesso negado 3' });
            return;
        }
        req.usernameLogged = username;
        req.accountType = accountType;
        next();
    });
};
//# sourceMappingURL=jwt.js.map