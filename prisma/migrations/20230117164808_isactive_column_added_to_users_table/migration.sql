-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CASHIER',
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("id", "name", "password", "role", "username") SELECT "id", "name", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
