/*
  Warnings:

  - Added the required column `code` to the `Departement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Departement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "totalCreditHour" INTEGER NOT NULL,
    "pricePerCreditHour" DECIMAL NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "creditHoursPerPaymentWay" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Departement_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Departement" ("creditHoursPerPaymentWay", "id", "isActive", "name", "paymentTypeId", "pricePerCreditHour", "totalCreditHour") SELECT "creditHoursPerPaymentWay", "id", "isActive", "name", "paymentTypeId", "pricePerCreditHour", "totalCreditHour" FROM "Departement";
DROP TABLE "Departement";
ALTER TABLE "new_Departement" RENAME TO "Departement";
CREATE UNIQUE INDEX "Departement_name_key" ON "Departement"("name");
CREATE UNIQUE INDEX "Departement_code_key" ON "Departement"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
