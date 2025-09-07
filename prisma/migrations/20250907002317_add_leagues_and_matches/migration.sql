/*
  Warnings:

  - You are about to drop the column `awayScore` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `championshipId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `homeScore` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `Championship` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `leagueId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Match" DROP CONSTRAINT "Match_championshipId_fkey";

-- AlterTable
ALTER TABLE "public"."Match" DROP COLUMN "awayScore",
DROP COLUMN "championshipId",
DROP COLUMN "homeScore",
ADD COLUMN     "leagueId" INTEGER NOT NULL,
ADD COLUMN     "scoreAway" INTEGER,
ADD COLUMN     "scoreHome" INTEGER,
ADD COLUMN     "status" TEXT;

-- DropTable
DROP TABLE "public"."Championship";

-- CreateTable
CREATE TABLE "public"."League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "season" INTEGER,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Match" ADD CONSTRAINT "Match_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "public"."League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
