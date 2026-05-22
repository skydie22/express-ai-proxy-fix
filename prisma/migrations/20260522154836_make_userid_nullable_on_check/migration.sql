-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_userId_fkey";

-- AlterTable
ALTER TABLE "Check" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
