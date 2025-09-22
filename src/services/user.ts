import type { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

type createEducationType = {
  user_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

export const findUsers = async (perPage: number, currentPage: number) => {
  const users = await prisma.users.findMany({
    skip: currentPage * perPage,
    take: perPage
  })

  return users;
}

export const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: { email }
  })

  return user;
}

export const findUserByUsername = async (username: string) => {
  const user = await prisma.users.findFirst({
    where: { username }
  })

  return user;
}

export const createUser = async (data: Prisma.usersCreateInput) => {
  const newUser = await prisma.users.create({
    data
  })

  return newUser;
}

export const getUserFollowingCount = async (id: number) => {
  const followingCount = await prisma.following.count({
    where: { follower_id: id }
  })

  return followingCount;
}

export const getUserFollowersCount = async (id: number) => {
  const followersCount = await prisma.following.count({
    where: { following_id: id }
  })

  return followersCount;
}

export const getUserPostsCount = async (id: number) => {
  const postsCount = await prisma.posts.count({
    where: { user_id: id }
  })

  return postsCount;
}

export const findUserExperiences = async (id: number) => {
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
  })

  return experiences;
};

export const findUserSkills = async (id: number) => {
  const skills = await prisma.user_skills.findMany({
    where: { user_id: id }
  });

  return skills;
}

export const findUserEducations = async (id: number) => {
  const educations = await prisma.educations.findMany({
    where: { user_id: id }
  });

  return educations;
}

export const findUserCertificates = async (id: number) => {
  const educations = await prisma.certificates.findMany({
    where: { user_id: id },
    orderBy: { issue_date: "desc" }
  });

  return educations;
}

export const checkIfFollows = async (follower_id: number, following_id: number) => {
  const follows = await prisma.following.findFirst({
    where: { follower_id, following_id }
  })

  return follows ? true : false;
}

export const follow = async (follower_id: number, following_id: number) => {
  const followed = await prisma.following.create({
    data: { follower_id, following_id }
  })

  return followed;
}
export const unfollow = async (follower_id: number, following_id: number) => {
  const followed = await prisma.following.deleteMany({
    where: { follower_id, following_id }
  })

  return followed;
}

export const createExperience = async (data: Prisma.experiencesCreateInput) => {
  const experience = await prisma.experiences.create({
    data
  })

  return experience;
}

export const createSkills = async (name: string, level: string, user_id: number) => {
  const newSkill = await prisma.user_skills.create({
    data: { name, level, user_id }
  })

  return newSkill;
}

export const findExperienceById = async (experience_id: number) => {
  const experience = await prisma.experiences.findFirst({
    where: { id: experience_id }
  })

  return experience;
}

export const findUserSkillById = async (user_skill_id: number) => {
  const userSkill = await prisma.user_skills.findFirst({
    where: { id: user_skill_id }
  })

  return userSkill;
}

export const createExperienceSkill = async (experience_id: number, user_skill_id: number) => {
  const newExperienceSkill = await prisma.experience_skills.create({
    data: { experience_id, user_skill_id }
  })

  return newExperienceSkill;
}

export const createEducation = async (data: Prisma.educationsCreateInput) => {
  const newExperienceSkill = await prisma.educations.create({ data })

  return newExperienceSkill;
}

export const createCertificate = async (data: Prisma.certificatesCreateInput) => {
  const newCertificate = await prisma.certificates.create({
    data
  })

  return newCertificate;
}