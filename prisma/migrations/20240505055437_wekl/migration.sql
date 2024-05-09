/*
  Warnings:

  - You are about to drop the column `companionId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `companionsId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "companionId";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "companionsId";
