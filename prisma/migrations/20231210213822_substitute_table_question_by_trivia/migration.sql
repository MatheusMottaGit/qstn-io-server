/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `questionId` on the `IncorrectAnswer` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Question";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Trivia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "quizId" TEXT,
    CONSTRAINT "Trivia_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IncorrectAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "option" TEXT NOT NULL,
    "triviaId" TEXT,
    CONSTRAINT "IncorrectAnswer_triviaId_fkey" FOREIGN KEY ("triviaId") REFERENCES "Trivia" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IncorrectAnswer" ("id", "option") SELECT "id", "option" FROM "IncorrectAnswer";
DROP TABLE "IncorrectAnswer";
ALTER TABLE "new_IncorrectAnswer" RENAME TO "IncorrectAnswer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
