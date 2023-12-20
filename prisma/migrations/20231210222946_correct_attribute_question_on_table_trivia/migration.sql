/*
  Warnings:

  - Added the required column `questionId` to the `Trivia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "triviaId" TEXT
);
INSERT INTO "new_Question" ("id", "text", "triviaId") SELECT "id", "text", "triviaId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Trivia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "quizId" TEXT,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "Trivia_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Trivia_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Trivia" ("category", "correctAnswer", "difficulty", "id", "quizId", "type") SELECT "category", "correctAnswer", "difficulty", "id", "quizId", "type" FROM "Trivia";
DROP TABLE "Trivia";
ALTER TABLE "new_Trivia" RENAME TO "Trivia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
