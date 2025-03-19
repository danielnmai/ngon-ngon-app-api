/*
  Warnings:

  - You are about to drop the column `minimumQuantity` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `prices` on the `Food` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "minimumQuantity",
DROP COLUMN "prices";

-- CreateTable
CREATE TABLE "FoodOptions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "size" "Size" NOT NULL,
    "price" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "FoodOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodOptions" ADD CONSTRAINT "FoodOptions_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
