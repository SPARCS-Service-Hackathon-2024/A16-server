-- CreateTable
CREATE TABLE "UserTag" (
    "name" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserTag_pkey" PRIMARY KEY ("name","userId")
);

-- AddForeignKey
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
