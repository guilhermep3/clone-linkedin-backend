/*
  Warnings:

  - You are about to drop the column `user_id` on the `post_comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post_likes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post_media` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post_shares` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `post_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `post_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `post_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `post_shares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `following` DROP FOREIGN KEY `following_ibfk_1`;

-- DropForeignKey
ALTER TABLE `following` DROP FOREIGN KEY `following_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post_comments` DROP FOREIGN KEY `post_comments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post_media` DROP FOREIGN KEY `post_media_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post_shares` DROP FOREIGN KEY `post_shares_ibfk_1`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_ibfk_1`;

-- DropIndex
DROP INDEX `follower_id` ON `following`;

-- DropIndex
DROP INDEX `following_id` ON `following`;

-- DropIndex
DROP INDEX `user_id` ON `post_comments`;

-- DropIndex
DROP INDEX `user_id` ON `post_likes`;

-- DropIndex
DROP INDEX `user_id` ON `post_media`;

-- DropIndex
DROP INDEX `user_id` ON `post_shares`;

-- DropIndex
DROP INDEX `user_id` ON `posts`;

-- AlterTable
ALTER TABLE `following` ADD COLUMN `follower_type` ENUM('user', 'company') NOT NULL DEFAULT 'user',
    ADD COLUMN `following_type` ENUM('user', 'company') NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `post_comments` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `owner_type` ENUM('user', 'company') NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `post_likes` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `owner_type` ENUM('user', 'company') NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `post_media` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `owner_type` ENUM('user', 'company') NOT NULL DEFAULT 'user',
    ADD COLUMN `post_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post_shares` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `owner_type` ENUM('user', 'company') NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NOT NULL,
    ADD COLUMN `owner_type` ENUM('user', 'company') NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE INDEX `following_follower_id_follower_type_idx` ON `following`(`follower_id`, `follower_type`);

-- CreateIndex
CREATE INDEX `following_following_id_following_type_idx` ON `following`(`following_id`, `following_type`);

-- CreateIndex
CREATE INDEX `post_comments_owner_id_owner_type_idx` ON `post_comments`(`owner_id`, `owner_type`);

-- CreateIndex
CREATE INDEX `post_likes_owner_id_owner_type_idx` ON `post_likes`(`owner_id`, `owner_type`);

-- CreateIndex
CREATE INDEX `post_media_owner_id_owner_type_idx` ON `post_media`(`owner_id`, `owner_type`);

-- CreateIndex
CREATE INDEX `post_shares_owner_id_owner_type_idx` ON `post_shares`(`owner_id`, `owner_type`);

-- CreateIndex
CREATE INDEX `posts_owner_id_owner_type_idx` ON `posts`(`owner_id`, `owner_type`);

-- AddForeignKey
ALTER TABLE `post_likes` ADD CONSTRAINT `post_likes_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `post_media` ADD CONSTRAINT `post_media_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
