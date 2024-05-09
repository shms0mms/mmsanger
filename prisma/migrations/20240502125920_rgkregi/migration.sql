/*
  Warnings:

  - You are about to drop the `ChatGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatGroup" DROP CONSTRAINT "ChatGroup_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatGroup" DROP CONSTRAINT "ChatGroup_userId_fkey";

-- DropTable
DROP TABLE "ChatGroup";
