/*
  Warnings:

  - Changed the type of `value` on the `Credit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `Debit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Credit" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Debit" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;
