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
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaymentForm_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaymentForm" ("id", "isActive", "month", "paymentTypeId", "quarter", "semister", "title", "year") SELECT "id", "isActive", "month", "paymentTypeId", "quarter", "semister", "title", "year" FROM "PaymentForm";
DROP TABLE "PaymentForm";
ALTER TABLE "new_PaymentForm" RENAME TO "PaymentForm";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
