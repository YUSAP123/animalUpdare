-- CreateTable
CREATE TABLE "Specie" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "clan" TEXT NOT NULL,

    CONSTRAINT "Specie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "colour" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "maleParent" INTEGER,
    "femaleParent" INTEGER,
    "specieId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specie_name_key" ON "Specie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specie_clan_key" ON "Specie"("clan");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_specieId_key" ON "Profile"("specieId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Specie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
