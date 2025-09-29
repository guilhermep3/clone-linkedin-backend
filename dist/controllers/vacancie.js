import { updateVacancieSchema, vacancieSchema } from "../schema/vacancie.js";
import { createVacancie, deleteVacancieById, findVacancieById, findVacancies, updateVacancieById } from "../services/vacancie.js";
import { pageSchema } from "../schema/pageSchema.js";
export const getVacancies = async (req, res) => {
    const user = req.userFound;
    const safeData = pageSchema.safeParse(req.query);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    let perPage = 10;
    let currentPage = safeData.data.page ?? 0;
    const vacancie = await findVacancies(user.id, perPage, currentPage);
    res.json({ vacancie });
};
export const getVacancie = async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await findVacancieById(id);
    if (!post) {
        res.status(404).json({ error: 'Postagem não encontrada' });
        return;
    }
    res.json({ post });
};
export const addVacancie = async (req, res) => {
    const user = req.userFound;
    const safeData = vacancieSchema.safeParse(req.body);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const newVacancie = await createVacancie(safeData.data, user.id);
    res.json({ newVacancie });
};
export const updateVacancie = async (req, res) => {
    const id = parseInt(req.params.id);
    const safeData = updateVacancieSchema.safeParse(req.body);
    if (!safeData.success) {
        res.status(400).json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const vacancieUpdated = await updateVacancieById(safeData.data, id);
    res.json({ vacancieUpdated });
};
export const deleteVacancie = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await deleteVacancieById(id);
        res.json({ deleted: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar vaga', errorDetails: error });
    }
};
//# sourceMappingURL=vacancie.js.map