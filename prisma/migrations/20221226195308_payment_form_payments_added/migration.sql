-- CreateTable
CREATE TABLE "PaymentFormPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentFormId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    CONSTRAINT "PaymentFormPayment_paymentFormId_fkey" FOREIGN KEY ("paymentFormId") REFERENCES "PaymentForm" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentFormPayment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentTypeId" INTEGER NOT NULL,
    "month" INTEGER,
    "quarter" INTEGER,
    "semister" INTEGER,
    "year" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "PaymentForm_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaymentForm" ("id", "month", "paymentTypeId", "year") SELECT "id", "month", "paymentTypeId", "year" FROM "PaymentForm";
DROP TABLE "PaymentForm";
ALTER TABLE "new_PaymentForm" RENAME TO "PaymentForm";
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "attachmentNo" TEXT NOT NULL,
    "paymentWay" TEXT NOT NULL DEFAULT 'BANK',
    "checkNo" TEXT NOT NULL,
    "penalty" DECIMAL,
    "total" DECIMAL NOT NULL,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("attachmentNo", "checkNo", "createdAT", "id", "studentId", "title", "total") SELECT "attachmentNo", "checkNo", "createdAT", "id", "studentId", "title", "total" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
