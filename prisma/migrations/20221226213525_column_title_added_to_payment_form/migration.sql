/*
  Warnings:

  - Added the required column `title` to the `PaymentForm` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "month" INTEGER,
    "quarter" INTEGER,
    "semister" INTEGER,
    "year" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "PaymentForm_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaymentForm" ("id", "isActive", "month", "paymentTypeId", "quarter", "semister", "year") SELECT "id", "isActive", "month", "paymentTypeId", "quarter", "semister", "year" FROM "PaymentForm";
DROP TABLE "PaymentForm";
ALTER TABLE "new_PaymentForm" RENAME TO "PaymentForm";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
