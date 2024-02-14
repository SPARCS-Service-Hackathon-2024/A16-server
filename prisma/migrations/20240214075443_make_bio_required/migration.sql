/*
  Warnings:

  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "User" SET "bio" = '' WHERE "bio" IS NULL;
ALTER TABLE "User" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '';
