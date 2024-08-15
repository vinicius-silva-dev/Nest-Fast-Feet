/*
  Warnings:

  - You are about to alter the column `latitude` on the `recipient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - You are about to alter the column `longitude` on the `recipient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "recipient" ALTER COLUMN "latitude" SET DATA TYPE BIGINT,
ALTER COLUMN "longitude" SET DATA TYPE BIGINT;
