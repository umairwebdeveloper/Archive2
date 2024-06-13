-- CreateEnum
CREATE TYPE "ExamSubjectCategory" AS ENUM ('EXACT', 'SOCIAL', 'LANGUAGE');

-- CreateEnum
CREATE TYPE "ExamPdfCategory" AS ENUM ('EXAM', 'CORRECTION_MODEL', 'WORK_APPENDIX', 'CORRECTION_MODEL_ADDITION');

-- CreateTable
CREATE TABLE "ExamLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExamLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSubject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ExamSubjectCategory" NOT NULL,
    "examLevelId" TEXT NOT NULL,

    CONSTRAINT "ExamSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSubjectPeriod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Period',
    "date" TIMESTAMP(3) NOT NULL,
    "examSubjectId" TEXT NOT NULL,

    CONSTRAINT "ExamSubjectPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSubjectPdf" (
    "id" TEXT NOT NULL,
    "category" "ExamPdfCategory" NOT NULL,
    "file" TEXT NOT NULL,
    "examSubjectPeriodId" TEXT NOT NULL,

    CONSTRAINT "ExamSubjectPdf_pkey" PRIMARY KEY ("id")
);
