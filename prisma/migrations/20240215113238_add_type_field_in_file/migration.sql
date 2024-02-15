-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('VIDEO');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "FileType" NOT NULL DEFAULT 'VIDEO';
