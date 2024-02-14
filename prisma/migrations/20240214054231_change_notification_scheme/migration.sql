/*
  Warnings:

  - You are about to drop the column `description` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `actorId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('COMMENT', 'LIKE', 'FOLLOW');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "description",
DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "actorId" TEXT NOT NULL,
ADD COLUMN     "objectId" TEXT NOT NULL,
ADD COLUMN     "type" "NotificationType" NOT NULL;
