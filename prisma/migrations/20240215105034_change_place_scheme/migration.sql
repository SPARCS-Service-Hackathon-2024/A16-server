/*
  Warnings:

  - You are about to drop the column `address` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[oid]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Place_address_key";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "address",
ADD COLUMN     "addressName" TEXT NOT NULL DEFAULT '대전 서구 괴정동 423-1',
ADD COLUMN     "categoryGroupCode" TEXT NOT NULL DEFAULT 'FD6',
ADD COLUMN     "categoryGroupName" TEXT NOT NULL DEFAULT '음식점',
ADD COLUMN     "categoryName" TEXT NOT NULL DEFAULT '음식점 > 간식 > 제과,베이커리',
ADD COLUMN     "oid" TEXT NOT NULL DEFAULT '9755754',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '1588-8069',
ADD COLUMN     "placeUrl" TEXT NOT NULL DEFAULT 'http://place.map.kakao.com/1513470800',
ADD COLUMN     "roadAddressName" TEXT NOT NULL DEFAULT '대전 서구 계롱로 598',
ALTER COLUMN "name" SET DEFAULT '성심당 롯데백화점 대전점',
ALTER COLUMN "lat" SET DEFAULT 127.39002744810387,
ALTER COLUMN "lng" SET DEFAULT 36.34027840299744;

-- CreateIndex
CREATE UNIQUE INDEX "Place_oid_key" ON "Place"("oid");
