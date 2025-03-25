/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `preferences` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `xpPoints` on the `profiles` table. All the data in the column will be lost.
  - The `level` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `FlashcardProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LessonProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAchievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlashcardProgress" DROP CONSTRAINT "FlashcardProgress_deckId_fkey";

-- DropForeignKey
ALTER TABLE "FlashcardProgress" DROP CONSTRAINT "FlashcardProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_userId_fkey";

-- AlterTable
ALTER TABLE "flashcard_decks" ADD COLUMN     "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "category" TEXT,
ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'medium',
ADD COLUMN     "estimatedTimeMinutes" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastStudyDate" TIMESTAMP(3),
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nextReviewDate" TIMESTAMP(3),
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "preferences",
DROP COLUMN "updatedAt",
DROP COLUMN "xpPoints",
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'pt-BR',
ADD COLUMN     "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "learningGoal" TEXT NOT NULL DEFAULT '10',
ADD COLUMN     "notifications" JSONB NOT NULL DEFAULT '{"email":true,"push":true,"streak":true,"updates":false}',
ADD COLUMN     "streakDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "FlashcardProgress";

-- DropTable
DROP TABLE "LessonProgress";

-- DropTable
DROP TABLE "UserAchievement";

-- DropTable
DROP TABLE "achievements";

-- DropTable
DROP TABLE "lessons";

-- CreateTable
CREATE TABLE "flashcard_progress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "lastStudiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studyCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flashcard_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flashcard_progress_userId_deckId_cardId_key" ON "flashcard_progress"("userId", "deckId", "cardId");

-- AddForeignKey
ALTER TABLE "flashcard_progress" ADD CONSTRAINT "flashcard_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcard_progress" ADD CONSTRAINT "flashcard_progress_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "flashcard_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcard_progress" ADD CONSTRAINT "flashcard_progress_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "flashcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
