/*
  Warnings:

  - You are about to drop the column `text` on the `Trivia` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "triviaId" TEXT,
    CONSTRAINT "Question_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trivia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "quizId" TEXT,
    CONSTRAINT "Trivia_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Trivia" ("category", "correctAnswer", "difficulty", "id", "quizId", "type") SELECT "category", "correctAnswer", "difficulty", "id", "quizId", "type" FROM "Trivia";
DROP TABLE "Trivia";
ALTER TABLE "new_Trivia" RENAME TO "Trivia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
