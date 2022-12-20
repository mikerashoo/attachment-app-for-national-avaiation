/*
  Warnings:

  - You are about to drop the `_DepartementToDepartementPaymentPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_DepartementToDepartementPaymentPrice_B_index";

-- DropIndex
DROP INDEX "_DepartementToDepartementPaymentPrice_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DepartementToDepartementPaymentPrice";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DepartementPaymentPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departementId" INTEGER NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    CONSTRAINT "DepartementPaymentPrice_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "Departement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DepartementPaymentPrice_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DepartementPaymentPrice" ("departementId", "id", "paymentTypeId", "price") SELECT "departementId", "id", "paymentTypeId", "price" FROM "DepartementPaymentPrice";
DROP TABLE "DepartementPaymentPrice";
ALTER TABLE "new_DepartementPaymentPrice" RENAME TO "DepartementPaymentPrice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
