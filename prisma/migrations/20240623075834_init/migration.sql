-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "creditAmount" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "debitAmount" TEXT NOT NULL DEFAULT '0';
