/*
  Warnings:

  - You are about to drop the column `category` on the `flashcard_decks` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `flashcard_decks` table. All the data in the column will be lost.
  - You are about to drop the column `audio_url` on the `flashcards` table. All the data in the column will be lost.
  - You are about to drop the column `deck_id` on the `flashcards` table. All the data in the column will be lost.
  - You are about to drop the column `definition` on the `flashcards` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `flashcards` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `flashcards` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `xp_points` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_flashcard_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_lesson_progress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `flashcard_decks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `back` to the `flashcards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deckId` to the `flashcards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front` to the `flashcards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `flashcards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_achievements" DROP CONSTRAINT "user_achievements_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "user_achievements" DROP CONSTRAINT "user_achievements_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_flashcard_progress" DROP CONSTRAINT "user_flashcard_progress_flashcard_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "user_flashcard_progress" DROP CONSTRAINT "user_flashcard_progress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_lesson_progress" DROP CONSTRAINT "user_lesson_progress_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "user_lesson_progress" DROP CONSTRAINT "user_lesson_progress_user_id_fkey";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "flashcard_decks" DROP COLUMN "category",
DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "flashcards" DROP COLUMN "audio_url",
DROP COLUMN "deck_id",
DROP COLUMN "definition",
DROP COLUMN "image_url",
DROP COLUMN "term",
ADD COLUMN     "back" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deckId" INTEGER NOT NULL,
ADD COLUMN     "front" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatar_url",
DROP COLUMN "full_name",
DROP COLUMN "user_id",
DROP COLUMN "xp_points",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "xpPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "user_achievements";

-- DropTable
DROP TABLE "user_flashcard_progress";

-- DropTable
DROP TABLE "user_lesson_progress";

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashcardProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "achievementId" INTEGER NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_key" ON "LessonProgress"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "FlashcardProgress_userId_deckId_key" ON "FlashcardProgress"("userId", "deckId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "flashcard_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardProgress" ADD CONSTRAINT "FlashcardProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardProgress" ADD CONSTRAINT "FlashcardProgress_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "flashcard_decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
