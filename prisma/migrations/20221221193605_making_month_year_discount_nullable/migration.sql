-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "collageId" TEXT NOT NULL,
    "departementId" INTEGER NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discount" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Student_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "Departement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("collageId", "departementId", "discount", "id", "isActive", "name", "registeredAt") SELECT "collageId", "departementId", "discount", "id", "isActive", "name", "registeredAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_collageId_key" ON "Student"("collageId");
CREATE TABLE "new_PaymentTypePrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" INTEGER NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "month" INTEGER,
    "year" INTEGER,
    CONSTRAINT "PaymentTypePrice_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentTypePrice_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaymentTypePrice" ("id", "month", "paymentId", "paymentTypeId", "price", "year") SELECT "id", "month", "paymentId", "paymentTypeId", "price", "year" FROM "PaymentTypePrice";
DROP TABLE "PaymentTypePrice";
ALTER TABLE "new_PaymentTypePrice" RENAME TO "PaymentTypePrice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
