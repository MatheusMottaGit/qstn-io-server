-- CreateTable
CREATE TABLE "IncorrectAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "option" TEXT NOT NULL,
    "questionId" TEXT,
    CONSTRAINT "IncorrectAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
