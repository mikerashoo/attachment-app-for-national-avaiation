/*
  Warnings:

  - Added the required column `creditHoursPerPaymentWay` to the `Departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTypeId` to the `Departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerCreditHour` to the `Departement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCreditHour` to the `Departement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "DepartementPaymentPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departementId" INTEGER NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartementToDepartementPaymentPrice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DepartementToDepartementPaymentPrice_A_fkey" FOREIGN KEY ("A") REFERENCES "Departement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DepartementToDepartementPaymentPrice_B_fkey" FOREIGN KEY ("B") REFERENCES "DepartementPaymentPrice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Departement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "totalCreditHour" INTEGER NOT NULL,
    "pricePerCreditHour" DECIMAL NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "creditHoursPerPaymentWay" DECIMAL NOT NULL,
    CONSTRAINT "Departement_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Departement" ("id", "name") SELECT "id", "name" FROM "Departement";
DROP TABLE "Departement";
ALTER TABLE "new_Departement" RENAME TO "Departement";
CREATE UNIQUE INDEX "Departement_name_key" ON "Departement"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_DepartementToDepartementPaymentPrice_AB_unique" ON "_DepartementToDepartementPaymentPrice"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartementToDepartementPaymentPrice_B_index" ON "_DepartementToDepartementPaymentPrice"("B");
