import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";
import { getPublicUrl } from "../utils/url.js";
export const findUsers = async (perPage, currentPage) => {
    const users = await prisma.users.findMany({
        skip: currentPage * perPage,
        take: perPage
    });
    return users;
};
export const findUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: { email }
    });
    return user;
};
export const findUserByUsername = async (username) => {
    const user = await prisma.users.findFirst({
        where: { username }
    });
    return user;
};
export const createUser = async (data) => {
    const newUser = await prisma.users.create({
        data
    });
    return newUser;
};
export const getUserFollowingCount = async (id) => {
    const followingCount = await prisma.following.count({
        where: { follower_id: id, follower_type: 'user' }
    });
    return followingCount;
};
export const getUserFollowersCount = async (id) => {
    const followersCount = await prisma.following.count({
        where: { following_id: id, following_type: 'user' }
    });
    return followersCount;
};
export const getUserPostsCount = async (id) => {
    const postsCount = await prisma.posts.count({
        where: { owner_id: id, owner_type: 'user' }
    });
    return postsCount;
};
export const findUserExperiences = async (id) => {
    const experiences = await prisma.experiences.findMany({
        where: { user_id: id },
        include: {
            experience_skills: {
                select: {
                    user_skills: {
                        select: {
                            id: true,
                            name: true,
                            level: true,
                            created_at: true
                        }
                    },
                    experience_validations: {
                        select: {
                            companies: {
                                select: {
                                    id: true,
                                    avatar: true,
                                    name: true,
                                    username: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { start_date: 'desc' }
    });
    return experiences;
};
export const findUserSkills = async (id) => {
    const skills = await prisma.user_skills.findMany({
        where: { user_id: id }
    });
    return skills;
};
export const findUserEducations = async (id) => {
    const educations = await prisma.educations.findMany({
        where: { user_id: id }
    });
    return educations;
};
export const findUserCertificates = async (id) => {
    const educations = await prisma.certificates.findMany({
        where: { user_id: id },
        orderBy: { issue_date: "desc" }
    });
    return educations;
};
export const checkIfFollows = async (follower_id, following_id) => {
    const follows = await prisma.following.findFirst({
        where: { follower_id, following_id }
    });
    return follows ? true : false;
};
export const follow = async (follower_id, following_id) => {
    const followed = await prisma.following.create({
        data: { follower_id, following_id }
    });
    return followed;
};
export const unfollow = async (follower_id, following_id) => {
    const followed = await prisma.following.deleteMany({
        where: { follower_id, following_id }
    });
    return followed;
};
export const createExperience = async (data) => {
    const experience = await prisma.experiences.create({
        data
    });
    return experience;
};
export const createSkills = async (name, level, user_id) => {
    const newSkill = await prisma.user_skills.create({
        data: { name, level, user_id }
    });
    return newSkill;
};
export const findExperienceById = async (experience_id) => {
    const experience = await prisma.experiences.findFirst({
        where: { id: experience_id }
    });
    return experience;
};
export const findUserSkillById = async (user_skill_id) => {
    const userSkill = await prisma.user_skills.findFirst({
        where: { id: user_skill_id }
    });
    return userSkill;
};
export const createExperienceSkill = async (experience_id, user_skill_id) => {
    const newExperienceSkill = await prisma.experience_skills.create({
        data: { experience_id, user_skill_id }
    });
    return newExperienceSkill;
};
export const createEducation = async (data) => {
    const newExperienceSkill = await prisma.educations.create({ data });
    return newExperienceSkill;
};
export const createCertificate = async (data) => {
    const newCertificate = await prisma.certificates.create({ data });
    return newCertificate;
};
export const updateUserByUsername = async (data, username) => {
    const userUpdated = await prisma.users.update({
        data,
        where: { username }
    });
    return userUpdated;
};
export const updateExperienceById = async (data, id) => {
    const experienceUpdated = await prisma.experiences.update({
        data,
        where: { id: id }
    });
    return experienceUpdated;
};
export const updateUserSkillsById = async (data, id) => {
    const userSkillUpdated = await prisma.user_skills.update({
        data,
        where: { id }
    });
    return userSkillUpdated;
};
export const updateEducationById = async (data, id) => {
    const userSkillUpdated = await prisma.educations.update({
        data,
        where: { id }
    });
    return userSkillUpdated;
};
export const updateCertificateById = async (data, id) => {
    const userSkillUpdated = await prisma.certificates.update({
        data,
        where: { id }
    });
    return userSkillUpdated;
};
export const deleteUserById = async (id) => {
    await prisma.users.delete({
        where: { id }
    });
};
export const deleteUserSkillById = async (id) => {
    await prisma.user_skills.delete({
        where: { id }
    });
};
export const deleteExperienceById = async (id) => {
    await prisma.experiences.delete({
        where: { id }
    });
};
export const deleteExperienceSkillById = async (id) => {
    await prisma.experience_skills.delete({
        where: { id }
    });
};
export const deleteEducationById = async (id) => {
    await prisma.educations.delete({
        where: { id }
    });
};
export const deleteCertificateById = async (id) => {
    await prisma.certificates.delete({
        where: { id }
    });
};
export const getUserfollowing = async (id) => {
    const following = [];
    const reqFollow = await prisma.following.findMany({
        select: { following_id: true },
        where: { follower_id: id }
    });
    for (let reqItem of reqFollow) {
        following.push(reqItem.following_id);
    }
    return following;
};
export const getUserSuggestions = async (id) => {
    const following = await getUserfollowing(id);
    const followingPlusMe = [...following, id];
    const suggestion = await prisma.$queryRaw `
    SELECT
      name, username, avatar, bio
    FROM users
    WHERE
      id NOT IN (${Prisma.join(followingPlusMe)})
    ORDER BY RAND()
    LIMIT 5;
  `;
    for (let sugIndex in suggestion) {
        suggestion[sugIndex].avatar = getPublicUrl(suggestion[sugIndex].avatar);
    }
    return suggestion;
};
//# sourceMappingURL=user.js.map