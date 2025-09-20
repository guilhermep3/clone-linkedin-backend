-- CreateTable
CREATE TABLE `certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `issuer` VARCHAR(80) NOT NULL,
    `issue_date` DATE NULL,
    `credential` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `country` VARCHAR(40) NULL,
    `state` VARCHAR(40) NULL,
    `city` VARCHAR(80) NULL,
    `industry` VARCHAR(40) NOT NULL,
    `bio` VARCHAR(200) NULL,
    `about` TEXT NULL,
    `website` VARCHAR(200) NULL,
    `presentation_video_url` VARCHAR(400) NULL,
    `size` ENUM('small', 'medium', 'large') NULL,
    `verified` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `employment_type` ENUM('full_time', 'intern', 'contractor', 'partner') NOT NULL,
    `hired_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `educations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_skill_validations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skill_id` INTEGER NOT NULL,
    `validation_id` INTEGER NOT NULL,

    INDEX `skill_id`(`skill_id`),
    INDEX `validation_id`(`validation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experience_id` INTEGER NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `level` VARCHAR(20) NOT NULL,
    `added_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `experience_id`(`experience_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_validations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `validator_id` INTEGER NOT NULL,
    `skill_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `skill_id`(`skill_id`),
    INDEX `validator_id`(`validator_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `current` BOOLEAN NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `following` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,
    `added_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `follower_id`(`follower_id`),
    INDEX `following_id`(`following_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `media_url` VARCHAR(255) NOT NULL,
    `media_type` ENUM('image', 'video', 'file') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_shares` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `post_id`(`post_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` TEXT NULL,
    `visible` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `level` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `birth_date` DATE NULL,
    `country` VARCHAR(40) NULL,
    `state` VARCHAR(40) NULL,
    `city` VARCHAR(80) NULL,
    `profession` VARCHAR(40) NOT NULL,
    `bio` VARCHAR(200) NULL,
    `about` TEXT NULL,
    `website` VARCHAR(200) NULL,
    `verified` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacancies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `requirements` VARCHAR(1000) NULL,
    `benefits` VARCHAR(1000) NULL,
    `salary` DECIMAL(10, 2) NULL,
    `user_posted_id` INTEGER NULL,
    `company_id` INTEGER NOT NULL,
    `experience_level` ENUM('Intern', 'Assistant', 'Junior', 'Mid', 'Senior', 'Director', 'Executive') NOT NULL,
    `job_type` ENUM('Full-time', 'Part-time', 'Temporary', 'Volunteer', 'Other') NOT NULL,
    `location` ENUM('Remote', 'Hybrid', 'On-site') NOT NULL,
    `published_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `active` BOOLEAN NULL DEFAULT true,

    INDEX `company_id`(`company_id`),
    INDEX `user_posted_id`(`user_posted_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_employees` ADD CONSTRAINT `company_employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experience_skill_validations` ADD CONSTRAINT `experience_skill_validations_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `experience_skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_skill_validations` ADD CONSTRAINT `experience_skill_validations_ibfk_2` FOREIGN KEY (`validation_id`) REFERENCES `experience_validations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_skills` ADD CONSTRAINT `experience_skills_ibfk_1` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experience_validations` ADD CONSTRAINT `experience_validations_ibfk_1` FOREIGN KEY (`validator_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experience_validations` ADD CONSTRAINT `experience_validations_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `experience_skills`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `following` ADD CONSTRAINT `following_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_likes` ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_likes` ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_media` ADD CONSTRAINT `post_media_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_shares` ADD CONSTRAINT `post_shares_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_shares` ADD CONSTRAINT `post_shares_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vacancies` ADD CONSTRAINT `vacancies_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vacancies` ADD CONSTRAINT `vacancies_ibfk_2` FOREIGN KEY (`user_posted_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
