/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `readingIntentions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "readingIntentions_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "readingIntentions_userId_title_key" ON "readingIntentions"("userId", "title");
