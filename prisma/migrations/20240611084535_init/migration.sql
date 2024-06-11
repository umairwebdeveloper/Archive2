/*
  Warnings:

  - A unique constraint covering the columns `[textId]` on the table `Highlight` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Highlight_textId_key` ON `Highlight`(`textId`);
