/*
  Warnings:

  - You are about to drop the `Mating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Specie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('BUCK', 'DOE');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_specieId_fkey";

-- DropTable
DROP TABLE "Mating";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Specie";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Clan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nickName" TEXT,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rabit" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "ClanId" INTEGER NOT NULL,
    "mother" INTEGER,
    "father" INTEGER,
    "ofspring" INTEGER,
    "gender" "Gender" NOT NULL DEFAULT 'BUCK',

    CONSTRAINT "Rabit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clan_name_key" ON "Clan"("name");

-- AddForeignKey
ALTER TABLE "Rabit" ADD CONSTRAINT "Rabit_ClanId_fkey" FOREIGN KEY ("ClanId") REFERENCES "Clan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
