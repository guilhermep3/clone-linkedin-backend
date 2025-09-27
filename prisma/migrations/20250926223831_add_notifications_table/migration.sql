-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `actor_id` INTEGER NULL,
    `actor_type` ENUM('user', 'company') NOT NULL,
    `type` ENUM('Like', 'Comment', 'Follow', 'Share') NOT NULL,
    `entity_id` INTEGER NULL,
    `entity_type` ENUM('Post', 'Comment', 'Vacancy') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
