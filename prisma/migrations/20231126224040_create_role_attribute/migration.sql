/*
  Warnings:

  - Added the required column `role` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Student" ("avatarUrl", "email", "googleId", "id", "name") SELECT "avatarUrl", "email", "googleId", "id", "name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_googleId_key" ON "Student"("googleId");
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Teacher" ("avatarUrl", "email", "googleId", "id", "name") SELECT "avatarUrl", "email", "googleId", "id", "name" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_googleId_key" ON "Teacher"("googleId");
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
