/*
  Warnings:

  - The values [small,medium,large] on the enum `companies_size` will be removed. If these variants are still used in the database, this will fail.
  - The values [full_time,part_time,intern,contractor,partner] on the enum `company_employees_employment_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `educations` table. All the data in the column will be lost.
  - The values [image,video,file] on the enum `post_media_media_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `diploma` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field_of_study` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `educations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN `type` ENUM('Institution', 'Company') NOT NULL DEFAULT 'Company',
    MODIFY `size` ENUM('Small', 'Medium', 'Large') NULL;

-- AlterTable
ALTER TABLE `company_employees` MODIFY `employment_type` ENUM('Full_time', 'Part_time', 'Intern', 'Contractor', 'Partner') NOT NULL;

-- AlterTable
ALTER TABLE `educations` DROP COLUMN `name`,
    ADD COLUMN `current` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `diploma` VARCHAR(80) NOT NULL,
    ADD COLUMN `field_of_study` VARCHAR(80) NOT NULL,
    ADD COLUMN `grade` VARCHAR(20) NULL,
    ADD COLUMN `institution` VARCHAR(80) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL,
    MODIFY `end_date` DATE NULL;

-- AlterTable
ALTER TABLE `post_media` MODIFY `media_type` ENUM('Image', 'Video', 'File') NOT NULL;
