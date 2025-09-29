import { getUserSuggestions } from "../services/user.js";
export const getSuggestions = async (req, res) => {
    const suggestions = await getUserSuggestions(req.userFound.id);
    res.json({ users: suggestions });
};
//# sourceMappingURL=suggestion.js.map