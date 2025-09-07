/*
  Warnings:

  - Made the column `apiId` on table `League` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."League" ALTER COLUMN "apiId" SET NOT NULL;
