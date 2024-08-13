/*
  Warnings:

  - You are about to drop the column `user_id` on the `package` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "package" DROP CONSTRAINT "package_user_id_fkey";

-- AlterTable
ALTER TABLE "package" DROP COLUMN "user_id";
