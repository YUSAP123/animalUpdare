/*
  Warnings:

  - Changed the type of `name` on the `Clan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Clan" DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clan_name_key" ON "Clan"("name");
