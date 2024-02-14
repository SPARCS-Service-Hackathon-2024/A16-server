/*
  Warnings:

  - A unique constraint covering the columns `[followingId,userId]` on the table `Following` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Following_followingId_userId_key" ON "Following"("followingId", "userId");
