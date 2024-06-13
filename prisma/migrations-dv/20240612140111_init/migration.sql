/*
  Warnings:

  - A unique constraint covering the columns `[examLevelId]` on the table `ExamSubject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[examSubjectPeriodId]` on the table `ExamSubjectPdf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[examSubjectId]` on the table `ExamSubjectPeriod` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ExamSubject_examLevelId_key` ON `ExamSubject`(`examLevelId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExamSubjectPdf_examSubjectPeriodId_key` ON `ExamSubjectPdf`(`examSubjectPeriodId`);

-- CreateIndex
CREATE UNIQUE INDEX `ExamSubjectPeriod_examSubjectId_key` ON `ExamSubjectPeriod`(`examSubjectId`);
