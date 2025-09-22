/*
  Warnings:

  - You are about to drop the column `level` on the `experience_skills` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `experience_skills` table. All the data in the column will be lost.
  - Added the required column `user_skill_id` to the `experience_skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `experience_skills` DROP FOREIGN KEY `experience_skills_ibfk_1`;

-- AlterTable
ALTER TABLE `experience_skills` DROP COLUMN `level`,
    DROP COLUMN `name`,
    ADD COLUMN `user_skill_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `experience_skills_user_skill_id_idx` ON `experience_skills`(`user_skill_id`);

-- AddForeignKey
ALTER TABLE `experience_skills` ADD CONSTRAINT `experience_skills_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_skills` ADD CONSTRAINT `experience_skills_user_skill_id_fkey` FOREIGN KEY (`user_skill_id`) REFERENCES `user_skills`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `experience_skills_experience_id_idx` ON `experience_skills`(`experience_id`);
DROP INDEX `experience_id` ON `experience_skills`;
