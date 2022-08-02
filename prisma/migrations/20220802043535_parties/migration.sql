/*
  Warnings:

  - You are about to drop the `parties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_contractId_fkey";

-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_personId_fkey";

-- DropTable
DROP TABLE "parties";

-- CreateTable
CREATE TABLE "Party" (
    "personId" TEXT NOT NULL,
    "signRequired" BOOLEAN NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("personId","contractId")
);

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_personId_fkey" FOREIGN KEY ("personId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Party" ADD CONSTRAINT "Party_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
