/*
  Warnings:

  - You are about to drop the column `url` on the `ReviewFile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileId]` on the table `ReviewFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileId` to the `ReviewFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReviewFile" DROP COLUMN "url",
ADD COLUMN     "fileId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "originalName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewFile_fileId_key" ON "ReviewFile"("fileId");

-- AddForeignKey
ALTER TABLE "ReviewFile" ADD CONSTRAINT "ReviewFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
