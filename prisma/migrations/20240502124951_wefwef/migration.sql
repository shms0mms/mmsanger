/*
  Warnings:

  - You are about to drop the column `userId` on the `chat` table. All the data in the column will be lost.
  - Added the required column `companionId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_companionsId_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "companionId" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ChatGroup" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "ChatGroup_pkey" PRIMARY KEY ("chatId","userId")
);

-- CreateTable
CREATE TABLE "_Chats" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Chats_AB_unique" ON "_Chats"("A", "B");

-- CreateIndex
CREATE INDEX "_Chats_B_index" ON "_Chats"("B");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatGroup" ADD CONSTRAINT "ChatGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatGroup" ADD CONSTRAINT "ChatGroup_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Chats" ADD CONSTRAINT "_Chats_A_fkey" FOREIGN KEY ("A") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Chats" ADD CONSTRAINT "_Chats_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
