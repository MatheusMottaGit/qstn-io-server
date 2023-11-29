/*
  Warnings:

  - You are about to alter the column `category` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "amount" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "quizId" TEXT,
    CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("amount", "category", "difficulty", "quizId", "statement", "type") SELECT "amount", "category", "difficulty", "quizId", "statement", "type" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
