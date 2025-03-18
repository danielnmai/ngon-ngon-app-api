/*
  Warnings:

  - You are about to drop the column `price` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "price",
ADD COLUMN     "minimumQuantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "prices" INTEGER[];
