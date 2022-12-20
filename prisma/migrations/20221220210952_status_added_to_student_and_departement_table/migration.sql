-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "collageId" TEXT NOT NULL,
    "departementId" INTEGER NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Student_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "Departement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("collageId", "departementId", "id", "name", "registeredAt") SELECT "collageId", "departementId", "id", "name", "registeredAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_collageId_key" ON "Student"("collageId");
CREATE TABLE "new_Departement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "totalCreditHour" INTEGER NOT NULL,
    "pricePerCreditHour" DECIMAL NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "creditHoursPerPaymentWay" DECIMAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Departement_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Departement" ("creditHoursPerPaymentWay", "id", "name", "paymentTypeId", "pricePerCreditHour", "totalCreditHour") SELECT "creditHoursPerPaymentWay", "id", "name", "paymentTypeId", "pricePerCreditHour", "totalCreditHour" FROM "Departement";
DROP TABLE "Departement";
ALTER TABLE "new_Departement" RENAME TO "Departement";
CREATE UNIQUE INDEX "Departement_name_key" ON "Departement"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
