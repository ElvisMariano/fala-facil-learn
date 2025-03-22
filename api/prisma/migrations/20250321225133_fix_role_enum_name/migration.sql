/*
  Warnings:

  - You are about to drop the column `score` on the `progress` table. All the data in the column will be lost.
  - The `status` column on the `progress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lastActivity` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,lessonId]` on the table `progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "progress" DROP COLUMN "score",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "errors" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nextReview" TIMESTAMP(3),
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "timeSpent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "xpEarned" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastActivity",
ADD COLUMN     "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

-- CreateIndex
CREATE INDEX "progress_userId_status_idx" ON "progress"("userId", "status");

-- CreateIndex
CREATE INDEX "progress_lessonId_status_idx" ON "progress"("lessonId", "status");

-- CreateIndex
CREATE INDEX "progress_userId_nextReview_idx" ON "progress"("userId", "nextReview");

-- CreateIndex
CREATE UNIQUE INDEX "progress_userId_lessonId_key" ON "progress"("userId", "lessonId");
