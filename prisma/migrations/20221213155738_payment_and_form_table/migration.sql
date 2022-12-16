-- CreateTable
CREATE TABLE "PaymentForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "departementId" INTEGER NOT NULL,
    "formId" INTEGER NOT NULL,
    "attachment" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_departementId_fkey" FOREIGN KEY ("departementId") REFERENCES "Departement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_formId_fkey" FOREIGN KEY ("formId") REFERENCES "PaymentForm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
