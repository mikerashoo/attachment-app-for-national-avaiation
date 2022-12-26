/*
  Warnings:

  - You are about to drop the column `collageId` on the `Payment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "attachmentNo" TEXT NOT NULL,
    "checkNo" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("attachmentNo", "checkNo", "createdAT", "id", "studentId", "title", "total") SELECT "attachmentNo", "checkNo", "createdAT", "id", "studentId", "title", "total" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
