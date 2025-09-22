/*
  Warnings:

  - You are about to drop the column `validator_id` on the `experience_validations` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the `experience_skill_validations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `certificates` table without a default value. This is not possible if the table is not empty.
  - Made the column `verified` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `user_id` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `experience_validations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Made the column `current` on table `experiences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visible` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verified` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `vacancies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `experience_skill_validations` DROP FOREIGN KEY `experience_skill_validations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `experience_skill_validations` DROP FOREIGN KEY `experience_skill_validations_ibfk_2`;

-- DropForeignKey
ALTER TABLE `experience_validations` DROP FOREIGN KEY `experience_validations_ibfk_1`;

-- DropForeignKey
ALTER TABLE `experience_validations` DROP FOREIGN KEY `experience_validations_ibfk_2`;

-- DropIndex
DROP INDEX `validator_id` ON `experience_validations`;

-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `companies` ADD COLUMN `avatar` VARCHAR(200) NOT NULL DEFAULT 'default.jpg',
    ADD COLUMN `cover` VARCHAR(200) NOT NULL DEFAULT 'default.jpg',
    MODIFY `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `company_employees` MODIFY `employment_type` ENUM('full_time', 'part_time', 'intern', 'contractor', 'partner') NOT NULL;

-- AlterTable
ALTER TABLE `educations` ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `end_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `experience_validations` DROP COLUMN `validator_id`,
    ADD COLUMN `company_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `experiences` DROP COLUMN `name`,
    ADD COLUMN `company_id` INTEGER NOT NULL,
    MODIFY `current` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `posts` MODIFY `visible` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` MODIFY `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `vacancies` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `experience_skill_validations`;

-- CreateIndex
CREATE INDEX `educations_user_id_idx` ON `educations`(`user_id`);

-- CreateIndex
CREATE INDEX `experience_validations_company_id_idx` ON `experience_validations`(`company_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_employees` ADD CONSTRAINT `company_employees_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educations` ADD CONSTRAINT `educations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_validations` ADD CONSTRAINT `experience_validations_skill_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `experience_skills`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experience_validations` ADD CONSTRAINT `experience_validations_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `experiences` ADD CONSTRAINT `experiences_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- RedefineIndex
CREATE INDEX `experience_validations_skill_id_idx` ON `experience_validations`(`skill_id`);
DROP INDEX `skill_id` ON `experience_validations`;
