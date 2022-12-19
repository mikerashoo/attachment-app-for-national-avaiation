/*
  Warnings:

  - You are about to drop the `PaymentType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PaymentType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "payment_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isPaymentWay" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_type_name_key" ON "payment_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "payment_type_code_key" ON "payment_type"("code");
