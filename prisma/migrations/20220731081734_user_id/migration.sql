/*
  Warnings:

  - The primary key for the `contracts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `drafts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdBy` on the `drafts` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `creatorId` to the `drafts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drafts" DROP CONSTRAINT "drafts_createdBy_fkey";

-- AlterTable
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "contracts_id_seq";

-- AlterTable
ALTER TABLE "drafts" DROP CONSTRAINT "drafts_pkey",
DROP COLUMN "createdBy",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "drafts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "drafts_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
