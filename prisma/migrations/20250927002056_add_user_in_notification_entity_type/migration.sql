/*
  Warnings:

  - The values [Comment] on the enum `notifications_entity_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `notifications` MODIFY `entity_type` ENUM('Post', 'User', 'Vacancy') NOT NULL;
