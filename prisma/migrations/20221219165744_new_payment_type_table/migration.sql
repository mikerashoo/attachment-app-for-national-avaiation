/*
  Warnings:

  - You are about to drop the `payment_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "payment_type";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Ptype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isPaymentWay" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ptype_name_key" ON "Ptype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ptype_code_key" ON "Ptype"("code");
