/*
  Warnings:

  - Added the required column `userId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "attachmentNo" TEXT NOT NULL,
    "paymentWay" TEXT NOT NULL DEFAULT 'BANK',
    "checkNo" TEXT,
    "penality" DECIMAL,
    "total" DECIMAL NOT NULL,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("attachmentNo", "checkNo", "createdAT", "id", "paymentWay", "penality", "studentId", "title", "total") SELECT "attachmentNo", "checkNo", "createdAT", "id", "paymentWay", "penality", "studentId", "title", "total" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
