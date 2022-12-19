-- CreateTable
CREATE TABLE "Departement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Departement_name_key" ON "Departement"("name");
