import { prisma } from "../utils/prisma.js";
export const findCompanyById = async (id) => {
    const company = await prisma.companies.findFirst({
        where: { id }
    });
    return company;
};
export const findCompanyByUsername = async (username) => {
    const company = await prisma.companies.findFirst({
        where: { username }
    });
    return company;
};
export const findCompanyByEmail = async (email) => {
    const company = await prisma.companies.findFirst({
        where: { email }
    });
    return company;
};
export const createCompany = async (data) => {
    const newCompany = await prisma.companies.create({
        data
    });
    return newCompany;
};
export const findCompanies = async (perPage, currentPage) => {
    const companies = await prisma.companies.findMany({
        skip: currentPage * perPage,
        take: perPage
    });
    return companies;
};
export const getCompanyFollowingCount = async (id) => {
    const followingCount = await prisma.following.count({
        where: { follower_id: id, follower_type: 'company' }
    });
    return followingCount;
};
export const getCompanyFollowersCount = async (id) => {
    const followersCount = await prisma.following.count({
        where: { following_id: id, following_type: 'company' }
    });
    return followersCount;
};
export const getCompanyPostsCount = async (id) => {
    const followersCount = await prisma.posts.count({
        where: { owner_id: id, owner_type: 'company' }
    });
    return followersCount;
};
export const getEmployeesCount = async (id) => {
    const employeesCount = await prisma.company_employees.count({
        where: { company_id: id }
    });
    return employeesCount;
};
export const findEmployees = async (company_id) => {
    const employees = await prisma.company_employees.findMany({
        where: { company_id }
    });
    return employees;
};
export const addEmployed = async (company_id, user_id, role) => {
    const newEmployed = await prisma.company_employees.create({
        data: { company_id, user_id, role, employment_type: 'Full_time' }
    });
    return newEmployed;
};
export const updateCompanyById = async (id, data) => {
    const companyUpdated = await prisma.companies.update({
        where: { id },
        data
    });
    return companyUpdated;
};
export const deleteCompanyById = async (id) => {
    await prisma.companies.delete({
        where: { id }
    });
};
//# sourceMappingURL=company.js.map