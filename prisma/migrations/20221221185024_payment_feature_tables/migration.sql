/*
  Warnings:

  - Added the required column `discount` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "collageId" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "attachmentNo" TEXT NOT NULL,
    "checkNo" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    "createdAT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentTypePrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" INTEGER NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    CONSTRAINT "PaymentTypePrice_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentTypePrice_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "collageId" TEXT NOT NULL,
    "departementId" INTEGER NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discount" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Student_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "Departement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("collageId", "departementId", "id", "isActive", "name", "registeredAt") SELECT "collageId", "departementId", "id", "isActive", "name", "registeredAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_collageId_key" ON "Student"("collageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_collageId_key" ON "Payment"("collageId");
