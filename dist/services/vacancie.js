import { prisma } from "../utils/prisma.js";
export const findVacancies = async (id, perPage, currentPage) => {
    const vacancie = await prisma.vacancies.findMany({
        skip: currentPage * perPage,
        take: perPage
    });
    return vacancie;
};
export const findVacancieById = async (id) => {
    const vacancie = await prisma.vacancies.findFirst({
        where: { id }
    });
    return vacancie;
};
export const createVacancie = async (data, id) => {
    const newVacancie = await prisma.vacancies.create({
        data
    });
    return newVacancie;
};
export const updateVacancieById = async (data, id) => {
    const vacancieUpdated = await prisma.vacancies.update({
        data,
        where: { id }
    });
    return vacancieUpdated;
};
export const deleteVacancieById = async (id) => {
    await prisma.vacancies.delete({
        where: { id }
    });
};
//# sourceMappingURL=vacancie.js.map