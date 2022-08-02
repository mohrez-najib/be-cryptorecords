/*
  Warnings:

  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Witness` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_personId_fkey";

-- DropForeignKey
ALTER TABLE "Witness" DROP CONSTRAINT "Witness_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Witness" DROP CONSTRAINT "Witness_personId_fkey";

-- DropTable
DROP TABLE "Party";

-- DropTable
DROP TABLE "Witness";

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "signRequired" BOOLEAN NOT NULL,
    "contractId" TEXT,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "witnesses" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "signRequired" BOOLEAN NOT NULL,
    "contractId" TEXT,

    CONSTRAINT "witnesses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_personId_fkey" FOREIGN KEY ("personId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "witnesses" ADD CONSTRAINT "witnesses_personId_fkey" FOREIGN KEY ("personId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "witnesses" ADD CONSTRAINT "witnesses_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
