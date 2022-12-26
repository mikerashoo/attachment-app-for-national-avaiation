/*
  Warnings:

  - You are about to drop the `PaymentTypePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PaymentTypePrice";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PaymentForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentTypeId" INTEGER NOT NULL,
    "month" INTEGER,
    "year" INTEGER,
    CONSTRAINT "PaymentForm_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PaymentToPaymentForm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PaymentToPaymentForm_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaymentToPaymentForm_B_fkey" FOREIGN KEY ("B") REFERENCES "PaymentForm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentToPaymentForm_AB_unique" ON "_PaymentToPaymentForm"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentToPaymentForm_B_index" ON "_PaymentToPaymentForm"("B");
