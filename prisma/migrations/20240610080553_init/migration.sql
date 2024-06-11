/*
  Warnings:

  - You are about to drop the column `title` on the `uservideonote` table. All the data in the column will be lost.
  - Added the required column `content` to the `UserVideoNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `uservideonote` DROP COLUMN `title`,
    ADD COLUMN `content` TEXT NOT NULL;
