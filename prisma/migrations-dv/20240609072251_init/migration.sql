/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Resume_courseId_key` ON `Resume`(`courseId`);
