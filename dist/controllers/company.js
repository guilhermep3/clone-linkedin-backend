import { companySchema, updateCompanySchema } from "../schema/company.js";
import { createCompany, deleteCompanyById, findCompanies, findCompanyByEmail, findCompanyById, findCompanyByUsername, findEmployees, getCompanyFollowersCount, getCompanyFollowingCount, getCompanyPostsCount, getEmployeesCount, updateCompanyById } from "../services/company.js";
import { hash } from "bcrypt-ts";
import slug from "slug";
import { pageSchema } from "../schema/pageSchema.js";
export const addCompany = async (req, res) => {
    const safeData = companySchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const hasEmail = await findCompanyByEmail(safeData.data.email);
    if (hasEmail) {
        res.json({ error: 'Email já existe' });
        return;
    }
    const hasUsername = await findCompanyByUsername(safeData.data.username);
    if (hasUsername) {
        res.status(400).json({ error: 'Username já existe' });
        return;
    }
    let generateSlug = true;
    let username = safeData.data.username;
    while (generateSlug) {
        const hasSlug = await findCompanyByUsername(username);
        if (hasSlug) {
            const slugSuffix = Math.floor(Math.random() * 999999).toString();
            username = slug(username, slugSuffix);
        }
        else {
            generateSlug = false;
        }
    }
    const hashPassword = await hash(safeData.data.password, 10);
    const companyData = {
        ...safeData.data,
        password: hashPassword
    };
    const newCompany = await createCompany(companyData);
    res.json({ newCompany });
};
export const getCompany = async (req, res) => {
    const id = parseInt(req.params.id);
    const company = await findCompanyById(id);
    if (!company) {
        res.status(400).json({ error: '' });
        return;
    }
    const followingCount = await getCompanyFollowingCount(company.id);
    const followersCount = await getCompanyFollowersCount(company.id);
    const postsCount = await getCompanyPostsCount(company.id);
    const employeesCount = await getEmployeesCount(company.id);
    res.json({ company, followingCount, followersCount, postsCount, employeesCount });
};
export const getCompanies = async (req, res) => {
    const safeData = pageSchema.safeParse(req.query);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    let perPage = 10;
    let currentPage = safeData.data.page ?? 0;
    const companies = await findCompanies(perPage, currentPage);
    res.json({ companies });
};
export const getCompanyEmployees = async (req, res) => {
    const id = parseInt(req.params.id);
    const company = await findCompanyById(id);
    if (!company) {
        res.status(400).json({ error: 'Empresa não encontrada' });
        return;
    }
    const employees = await findEmployees(id);
    res.json({ employees });
};
export const updateCompany = async (req, res) => {
    const id = parseInt(req.params.id);
    const safeData = updateCompanySchema.safeParse(req.body);
    if (!safeData.success) {
        res.json({ error: safeData.error.flatten().fieldErrors });
        return;
    }
    const company = await findCompanyById(id);
    if (!company) {
        res.status(400).json({ error: 'Empresa não encontrada' });
        return;
    }
    const companyUpdated = await updateCompanyById(id, safeData.data);
    res.json({ companyUpdated });
};
export const deleteCompany = async (req, res) => {
    const id = parseInt(req.params.id);
    const company = await findCompanyById(id);
    if (!company) {
        res.status(400).json({ error: 'Empresa não encontrada' });
        return;
    }
    await deleteCompanyById(id);
    res.json({ deleted: true });
};
//# sourceMappingURL=company.js.map