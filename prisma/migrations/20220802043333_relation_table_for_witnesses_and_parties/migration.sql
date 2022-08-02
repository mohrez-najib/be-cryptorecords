/*
  Warnings:

  - You are about to drop the `witnesses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "witnesses" DROP CONSTRAINT "witnesses_contractId_fkey";

-- DropForeignKey
ALTER TABLE "witnesses" DROP CONSTRAINT "witnesses_personId_fkey";

-- DropTable
DROP TABLE "witnesses";

-- CreateTable
CREATE TABLE "Witness" (
    "personId" TEXT NOT NULL,
    "signRequired" BOOLEAN NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Witness_pkey" PRIMARY KEY ("personId","contractId")
);

-- AddForeignKey
ALTER TABLE "Witness" ADD CONSTRAINT "Witness_personId_fkey" FOREIGN KEY ("personId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Witness" ADD CONSTRAINT "Witness_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
