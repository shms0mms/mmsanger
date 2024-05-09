/*
  Warnings:

  - The primary key for the `chat` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_companionsId_fkey";

-- AlterTable
ALTER TABLE "chat" DROP CONSTRAINT "chat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "chat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "chat_id_seq";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "chatId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "companionsId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companionsId_fkey" FOREIGN KEY ("companionsId") REFERENCES "chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
