/*
  Warnings:

  - Added the required column `examSubjectPeriodId` to the `ExamSubjectPdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examsubjectpdf` ADD COLUMN `examSubjectPeriodId` VARCHAR(191) NOT NULL;
