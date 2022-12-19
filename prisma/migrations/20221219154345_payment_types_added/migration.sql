-- CreateTable
CREATE TABLE "PaymentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isPaymentWay" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_name_key" ON "PaymentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_code_key" ON "PaymentType"("code");
