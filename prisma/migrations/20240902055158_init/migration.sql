/*
  Warnings:

  - Added the required column `color` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negative` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "negative" BOOLEAN NOT NULL;
