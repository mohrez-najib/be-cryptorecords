/*
  Warnings:

  - You are about to drop the column `creatorId` on the `drafts` table. All the data in the column will be lost.
  - Added the required column `body` to the `drafts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `drafts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drafts" DROP CONSTRAINT "drafts_creatorId_fkey";

-- AlterTable
ALTER TABLE "drafts" DROP COLUMN "creatorId",
ADD COLUMN     "body" JSONB NOT NULL,
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
