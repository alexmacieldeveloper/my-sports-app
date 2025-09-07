/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `League` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."League" ADD COLUMN     "apiId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "League_apiId_key" ON "public"."League"("apiId");
