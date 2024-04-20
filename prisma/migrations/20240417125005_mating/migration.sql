-- CreateTable
CREATE TABLE "Mating" (
    "id" SERIAL NOT NULL,
    "maleMated" INTEGER NOT NULL,
    "femaleMated" INTEGER NOT NULL,
    "dateMated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maternity" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mating_pkey" PRIMARY KEY ("id")
);
