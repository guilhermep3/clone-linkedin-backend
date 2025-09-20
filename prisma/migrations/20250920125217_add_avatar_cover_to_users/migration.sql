-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` VARCHAR(200) NOT NULL DEFAULT 'default.jpg',
    ADD COLUMN `cover` VARCHAR(200) NOT NULL DEFAULT 'default.jpg';
