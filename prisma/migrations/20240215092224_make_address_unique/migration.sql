/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Place_address_key" ON "Place"("address");
