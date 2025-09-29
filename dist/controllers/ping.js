export const ping = (req, res) => {
    res.json({ pong: true });
};
export const privateping = (req, res) => {
    res.json({ pong: true, userSlug: req.usernameLogged });
};
//# sourceMappingURL=ping.js.map