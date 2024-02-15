/*
  Warnings:

  - A unique constraint covering the columns `[thumbnailId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "thumbnailId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "File_thumbnailId_key" ON "File"("thumbnailId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
